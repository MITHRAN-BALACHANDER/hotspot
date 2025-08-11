# 🔥 Hotspot - Real-Time Chat Application

A modern, real-time chat application built with React and Node.js, featuring Google OAuth authentication, real-time messaging, and a beautiful glassmorphism UI design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node.js-v18+-brightgreen.svg)
![React](https://img.shields.io/badge/react-v19.0.0-blue.svg)

## 🌐 Live Demo

**Try it now:** [https://hotspotmithran.vercel.app/](https://hotspotmithran.vercel.app/)

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 💬 **Real-Time Messaging** - Instant message delivery using Socket.io
- 🏠 **Room-Based Chat** - Join different chat rooms for organized conversations
- 🎨 **Modern UI/UX** - Beautiful glassmorphism design with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Optimized with Vite for lightning-fast development and builds
- 🔄 **Real-Time Notifications** - Toast notifications for user actions and events

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **React Router DOM** - Client-side routing
- **Socket.io Client** - Real-time bidirectional event-based communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **Socket.io** - Real-time communication library
- **CORS** - Cross-Origin Resource Sharing middleware
- **Nodemon** - Development utility for auto-restarting server

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) 
- **npm** or **yarn** - Package manager
- **Git** - Version control system

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/MITHRAN-BALACHANDER/hotspot.git
cd hotspot
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Start the development server
npm run dev
# or for production
npm start
```

The backend server will start on `http://localhost:199`
 
Note: If port 199 is in use or you prefer a different port, set the `PORT` environment variable (default in code is 199). See Configuration section below.

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173` (or the next available port)

### 4. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Configure the OAuth consent screen (External or Internal)
4. Create OAuth 2.0 Client ID (Web application) using Google Identity Services
5. Copy the Client ID and set it in `Frontend/.env` as `VITE_GOOGLE_CLIENT_ID`

## 📁 Project Structure

```
Hotspot/
├── README.md
├── Backend/
│   ├── entity.js          # User management utilities
│   ├── package.json       # Backend dependencies and scripts
│   └── server.js          # Express server with Socket.io
└── Frontend/
    ├── eslint.config.js   # ESLint configuration
    ├── index.html         # HTML template
    ├── package.json       # Frontend dependencies and scripts
    ├── vite.config.js     # Vite configuration
    ├── vercel.json        # Vercel deployment config
    ├── public/            # Static assets
    └── src/
        ├── App.jsx        # Main application component
        ├── Login.jsx      # Authentication page
        ├── main.jsx       # Application entry point
        ├── index.css      # Global styles
        ├── assets/        # Images and icons
        ├── components/    # Reusable React components
        │   ├── AnimatedBackground.jsx
        │   ├── Chat.jsx
        │   ├── ChatHeader.jsx
        │   ├── ChatMessages.jsx
        │   ├── Herchat.jsx
        │   ├── Input.jsx
        │   ├── MessageInput.jsx
        │   ├── Navbar.jsx
        │   └── NicknameSetup.jsx
        └── pages/         # Page components
            ├── Aboutus.jsx
            └── Home.jsx
```

## 🎮 How to Use

### For Development:

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173`

### For Production:

1. **Access the Live Demo**: Visit [https://hotspotmithran.vercel.app/](https://hotspotmithran.vercel.app/)

### Usage Steps:

2. **Authentication**: 
   - Click on "Sign in with Google" to authenticate
   - Accept the terms and conditions

3. **Join a Chat Room**:
   - you will be added to a room based on your Location
   - Set your display name/nickname

4. **Start Chatting**:
   - Send messages in real-time
   - See when other users join or leave
   - Enjoy the smooth animations and responsive design

## 🔧 Configuration

### Backend Configuration

The backend server uses `PORT` from the environment (falls back to `199`). You can confirm or modify this in `Backend/server.js`:

```javascript
const PORT = process.env.PORT || 199;
server.listen(PORT, () => {
   console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

### Frontend Configuration

Vite configuration can be found in `Frontend/vite.config.js`. The default development server runs on port `5173`.

### Frontend Environment Variables

Create a `Frontend/.env` file (or copy `Frontend/.env.example`) and set:

```
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

After editing `.env`, restart the Vite dev server so changes take effect.

### OAuth Tips

- Ensure your Authorized JavaScript origins exactly match the protocol and domain.
- For local dev: `http://localhost:5173`
- For production: `https://hotspotmithran.vercel.app`
- Client ID must be exposed to the browser, so Vite requires the `VITE_` prefix.

## 📱 Responsive Design

Hotspot is designed to work seamlessly across all device sizes:

- **Desktop**: Full-featured experience with optimal layout
- **Tablet**: Adapted UI for medium screens
- **Mobile**: Touch-optimized interface for small screens

## 📡 Socket Events (How chat works)

The app uses Socket.io for real-time messaging. Key events:

- Client → Server: `join` — payload: `{ name, room }`
   - Server validates and joins the socket to the room
   - Emits to client: `toastmessage` and `message` with welcome text
   - Broadcasts to room: `toastmessage` and `message` that the user joined

- Client → Server: `sendMessage` — payload: `message: string`
   - Server relays: `message` to the user’s room as `{ user, text }`

- Disconnect
   - Server broadcasts: `message` to the room that the user left

Server location: `Backend/server.js` — helper functions in `Backend/entity.js`.

## 🧰 Troubleshooting

- Google sign-in window doesn’t show:
   - Verify `VITE_GOOGLE_CLIENT_ID` is set and the dev server was restarted
   - Check Authorized JavaScript origins in Google Cloud Console

- Can’t connect to chat / no messages:
   - Ensure backend is running and accessible from the frontend
   - Confirm frontend points to the correct backend URL (if applicable)

- Port already in use:
   - Change the port or export `PORT` before starting the server
   - On Windows PowerShell: `$env:PORT=4000; npm run dev`





## 👨‍💻 Authors
- **Mithran B** - [GitHub Profile](https://github.com/MITHRAN-BALACHANDER)
- **Abishek** - [GitHub Profile](https://github.com/Abishek00ujj)



---

**Happy Chatting! 🎉**

