import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const server = createServer(app);
const wss = new WebSocketServer({ server });

const sessions = new Map();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', activeSessions: sessions.size });
});

app.get('/session/:id', (req, res) => {
  const sessionId = req.params.id;
  const session = sessions.get(sessionId);
  
  if (session) {
    res.json({
      exists: true,
      code: session.code,
      activeClients: session.clients.size
    });
  } else {
    res.json({ exists: false });
  }
});

app.post('/session/create', (req, res) => {
  const { sessionId, code } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }
  
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      code: code || { html: '', css: '', javascript: '' },
      clients: new Set()
    });
  }
  
  res.json({ success: true, sessionId });
});

wss.on('connection', (ws) => {
  let currentSessionId = null;
  let clientId = Math.random().toString(36).substring(7);
  
  console.log(`Client ${clientId} connected`);
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`Received message from ${clientId}:`, data.type);
      
      switch (data.type) {
        case 'join':
          currentSessionId = data.sessionId;
          console.log(`Client ${clientId} joining session ${currentSessionId}`);
          
          if (!sessions.has(currentSessionId)) {
            console.log(`Creating new session: ${currentSessionId}`);
            sessions.set(currentSessionId, {
              code: data.initialCode || { html: '', css: '', javascript: '' },
              clients: new Set()
            });
          }
          
          const session = sessions.get(currentSessionId);
          session.clients.add(ws);
          
          console.log(`Session ${currentSessionId} now has ${session.clients.size} clients`);
          
          ws.send(JSON.stringify({
            type: 'sync',
            code: session.code,
            clientId: clientId
          }));
          
          broadcast(currentSessionId, {
            type: 'user-joined',
            clientId: clientId,
            totalClients: session.clients.size
          }, ws);
          
          console.log(`Client ${clientId} joined session ${currentSessionId}`);
          break;
          
        case 'code-update':
          console.log(`Code update from ${clientId} in session ${currentSessionId}`);
          if (currentSessionId && sessions.has(currentSessionId)) {
            const session = sessions.get(currentSessionId);
            
            session.code = {
              html: data.code.html ?? session.code.html,
              css: data.code.css ?? session.code.css,
              javascript: data.code.javascript ?? session.code.javascript
            };
            
            console.log(`Broadcasting code update to ${session.clients.size - 1} other clients`);
            
            broadcast(currentSessionId, {
              type: 'code-update',
              code: session.code,
              clientId: clientId
            }, ws);
          }
          break;
          
        case 'cursor-position':
          if (currentSessionId) {
            broadcast(currentSessionId, {
              type: 'cursor-position',
              clientId: clientId,
              position: data.position,
              language: data.language
            }, ws);
          }
          break;
          
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });
  
  ws.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    
    if (currentSessionId && sessions.has(currentSessionId)) {
      const session = sessions.get(currentSessionId);
      session.clients.delete(ws);
      
      broadcast(currentSessionId, {
        type: 'user-left',
        clientId: clientId,
        totalClients: session.clients.size
      });
      
      if (session.clients.size === 0) {
        setTimeout(() => {
          if (sessions.has(currentSessionId)) {
            const currentSession = sessions.get(currentSessionId);
            if (currentSession.clients.size === 0) {
              sessions.delete(currentSessionId);
              console.log(`Session ${currentSessionId} cleaned up`);
            }
          }
        }, 3600000);
      }
    }
  });
  
  ws.on('error', (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error);
  });
});

function broadcast(sessionId, message, excludeWs = null) {
  const session = sessions.get(sessionId);
  if (!session) return;
  
  const messageStr = JSON.stringify(message);
  session.clients.forEach((client) => {
    if (client !== excludeWs && client.readyState === 1) {
      client.send(messageStr);
    }
  });
}

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
