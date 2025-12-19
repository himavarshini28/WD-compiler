# WD Compiler WebSocket Server

This is the WebSocket server for real-time collaboration in the WD Compiler application.

## Features

- Real-time code synchronization across multiple clients
- Session-based collaboration
- Automatic reconnection handling
- Session cleanup for inactive sessions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (optional):
Create a `.env` file:
```
PORT=8080
NODE_ENV=production
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /health
```
Returns the server status and number of active sessions.

### Get Session Info
```
GET /session/:id
```
Returns information about a specific session.

### Create Session
```
POST /session/create
Body: { sessionId: string, code: { html, css, javascript } }
```
Creates a new collaboration session.

## WebSocket Events

### Client to Server

- `join`: Join a collaboration session
  ```json
  { "type": "join", "sessionId": "string", "initialCode": {...} }
  ```

- `code-update`: Send code changes
  ```json
  { "type": "code-update", "code": { "html": "...", "css": "...", "javascript": "..." } }
  ```

### Server to Client

- `sync`: Initial code synchronization
- `code-update`: Code changes from other clients
- `user-joined`: New user joined the session
- `user-left`: User left the session
- `error`: Error message

## Deployment

For production deployment, you can deploy this server to platforms like:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

Make sure to set the `VITE_WS_URL` environment variable in your client application to point to your deployed WebSocket server.
