class WebSocketService {
  constructor() {
    this.ws = null;
    this.sessionId = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.isIntentionallyClosed = false;
  }

  connect(sessionId, onMessage, onError, onConnect) {
    this.sessionId = sessionId;
    this.isIntentionallyClosed = false;
    
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';
    
    console.log('Connecting to WebSocket server:', wsUrl);
    
    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected to session:', sessionId);
        this.reconnectAttempts = 0;
        
        this.send({
          type: 'join',
          sessionId: sessionId
        });
        
        if (onConnect) onConnect();
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (this.listeners.has(data.type)) {
            this.listeners.get(data.type).forEach(callback => callback(data));
          }
          
          if (onMessage) onMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (onError) onError(error);
      };
      
      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        
        if (!this.isIntentionallyClosed && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          
          setTimeout(() => {
            this.connect(sessionId, onMessage, onError, onConnect);
          }, this.reconnectDelay * this.reconnectAttempts);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      if (onError) onError(error);
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not open. Current state:', this.ws?.readyState);
    }
  }

  sendCodeUpdate(code) {
    this.send({
      type: 'code-update',
      code: code
    });
  }

  sendCursorPosition(position, language) {
    this.send({
      type: 'cursor-position',
      position: position,
      language: language
    });
  }

  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  off(eventType, callback) {
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  disconnect() {
    this.isIntentionallyClosed = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
    this.sessionId = null;
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

const wsService = new WebSocketService();
export default wsService;
