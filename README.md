# WD Compiler

A real-time collaborative code editor for HTML, CSS, and JavaScript with live preview.

## Features

- 🚀 Real-time collaboration using WebSocket
- 💻 Live code preview
- 🎨 Syntax highlighting with CodeMirror
- 👥 Multi-user editing with presence indicators
- 🔄 Automatic reconnection
- 💾 Save and share code snippets
- 🔐 Firebase authentication
- 📱 Responsive design

## Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- CodeMirror
- React Router
- Zustand (state management)

### Backend
- Node.js
- Express
- WebSocket (ws library)
- Firebase (authentication & storage)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/himavarshini28/WD-compiler.git
cd WD-compiler
```

2. **Install dependencies**

For the client:
```bash
cd client
npm install
```

For the server:
```bash
cd server
npm install
```

3. **Configure environment variables**

Client `.env` (in `/client`):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_WS_URL=ws://localhost:8080
```

Server `.env` (in `/server`):
```env
PORT=8080
NODE_ENV=development
```

4. **Start the servers**

Terminal 1 - WebSocket Server:
```bash
cd server
npm start
```

Terminal 2 - Client:
```bash
cd client
npm run dev
```

5. **Access the application**
- Client: http://localhost:3000
- Server health check: http://localhost:8080/health

## Usage

### Creating a Collaboration Session

1. Write your HTML, CSS, and JavaScript code
2. Click the "Save" button
3. Copy the "Collaborative Link"
4. Share with others to edit together in real-time

### Joining a Session

1. Open the shared collaboration link
2. Start editing - changes sync automatically
3. See active user count in the header

## Project Structure

```
WD-compiler/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities & services
│   │   └── assets/      # Static assets
│   └── package.json
├── server/              # WebSocket server
│   ├── server.js        # Main server file
│   └── package.json
└── README.md
```

## Deployment

See [WEBSOCKET_GUIDE.md](./WEBSOCKET_GUIDE.md) for detailed deployment instructions.

### Quick Deploy

**Client** (Vercel/Netlify):
```bash
cd client
npm run build
# Deploy the dist/ folder
```

**Server** (Railway/Render/Heroku):
```bash
cd server
# Push to your deployment platform
```

Don't forget to update `VITE_WS_URL` in the client to point to your deployed server.

## Documentation

- [WebSocket Implementation Guide](./WEBSOCKET_GUIDE.md)
- [Server README](./server/README.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Author

Hima Varshini - [GitHub](https://github.com/himavarshini28)