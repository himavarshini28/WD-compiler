# WebSocket Implementation Guide

## Overview

The WD Compiler now uses WebSocket for real-time collaboration instead of Firebase Realtime Database. This provides:

- **Lower latency** - Direct peer-to-peer style communication
- **Better control** - Full control over the server logic
- **Cost efficiency** - No Firebase usage limits
- **Scalability** - Easier to scale horizontally

## Architecture

### Server (WebSocket Server)
- **Location**: `/server`
- **Technology**: Node.js + Express + ws library
- **Port**: 8080 (configurable via .env)
- **Features**:
  - Session management
  - Real-time code synchronization
  - User presence tracking
  - Automatic reconnection
  - Session cleanup

### Client (React Application)
- **Location**: `/client`
- **Service**: `websocketService.js`
- **Features**:
  - Automatic connection management
  - Reconnection with exponential backoff
  - Event-based message handling
  - Debounced code updates

## How It Works

### 1. Creating a Collaboration Session

When a user saves code:
1. Code is saved to Firebase (for persistence)
2. A unique session ID is generated
3. A shareable collaboration link is created: `/compiler/{sessionId}`

### 2. Joining a Session

When a user opens a collaboration link:
1. Client connects to WebSocket server with session ID
2. Server creates or joins existing session
3. Server sends current code state to new client
4. Other clients are notified of new user

### 3. Real-Time Updates

When code changes:
1. Client debounces updates (300ms)
2. Client sends `code-update` message to server
3. Server broadcasts to all other clients in session
4. Other clients update their editor

### 4. Disconnection Handling

When a user disconnects:
1. Server notifies other clients
2. Session remains active if other users present
3. Empty sessions are cleaned up after 1 hour

## Running the Application

### Development Mode

1. **Start WebSocket Server**:
```bash
cd server
npm install
npm start
```

2. **Start Client**:
```bash
cd client
npm install
npm run dev
```

3. **Access Application**:
- Client: http://localhost:3000
- Server Health Check: http://localhost:8080/health

### Production Deployment

#### Deploy WebSocket Server

You can deploy the server to:
- **Railway**: Easy WebSocket support
- **Render**: Free tier available
- **Heroku**: Requires paid dyno for WebSocket
- **AWS EC2**: Full control
- **DigitalOcean**: Droplets or App Platform

Example for Railway:
1. Push server code to GitHub
2. Connect repository to Railway
3. Set environment variables
4. Deploy

#### Configure Client

Update `.env` in client:
```
VITE_WS_URL=wss://your-deployed-server.com
```

Deploy client to Vercel/Netlify as usual.

## Environment Variables

### Server (.env)
```
PORT=8080
NODE_ENV=production
```

### Client (.env)
```
VITE_WS_URL=ws://localhost:8080  # Development
# VITE_WS_URL=wss://your-server.com  # Production
```

## Message Protocol

### Client → Server

**Join Session**:
```json
{
  "type": "join",
  "sessionId": "abc123",
  "initialCode": {
    "html": "...",
    "css": "...",
    "javascript": "..."
  }
}
```

**Code Update**:
```json
{
  "type": "code-update",
  "code": {
    "html": "...",
    "css": "...",
    "javascript": "..."
  }
}
```

### Server → Client

**Sync (Initial)**:
```json
{
  "type": "sync",
  "code": {...},
  "clientId": "xyz789"
}
```

**Code Update (Broadcast)**:
```json
{
  "type": "code-update",
  "code": {...},
  "clientId": "xyz789"
}
```

**User Joined**:
```json
{
  "type": "user-joined",
  "clientId": "xyz789",
  "totalClients": 3
}
```

**User Left**:
```json
{
  "type": "user-left",
  "clientId": "xyz789",
  "totalClients": 2
}
```

## Testing

### Test Real-Time Collaboration

1. Open browser window A: http://localhost:3000
2. Create a new snippet and save it
3. Copy the collaboration link
4. Open browser window B with the collaboration link
5. Edit code in window A - should update in window B
6. Edit code in window B - should update in window A

### Test Reconnection

1. Join a collaboration session
2. Stop the WebSocket server
3. Make code changes (they won't sync)
4. Restart the server
5. Client should automatically reconnect
6. Changes should sync again

## Troubleshooting

### WebSocket Connection Failed

- Check if server is running on correct port
- Verify VITE_WS_URL is correct in .env
- Check firewall settings
- For production, ensure SSL certificate for wss://

### Code Not Syncing

- Check browser console for errors
- Verify WebSocket connection status (green indicator)
- Check server logs for errors
- Ensure session ID is correct

### High Latency

- Check network connection
- Reduce debounce delay in Compiler.jsx
- Consider deploying server closer to users
- Check server resource usage

## Future Enhancements

Possible improvements:
- Cursor position sharing
- User avatars/names
- Chat functionality
- Code locking (prevent conflicts)
- Operational transformation for better conflict resolution
- Video/audio calls
- File upload support
- Version history

## Security Considerations

For production:
- Implement authentication
- Rate limiting
- Session expiration
- Input validation
- XSS protection
- CORS configuration
- SSL/TLS encryption
- Access control for sessions
