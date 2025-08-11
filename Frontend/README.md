# Hotspot Frontend (React + Vite)

This is the React frontend for the Hotspot real-time chat app. It provides Google OAuth sign-in, a modern UI with Tailwind CSS, and Socket.io-based messaging.

Live demo: https://hotspotmithran.vercel.app/

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

## Quick start

```bash
# from repo root
cd Frontend

# install deps
npm install

# start dev server (http://localhost:5173)
npm run dev
```

## Environment variables

Create a .env file (or copy .env.example):

```
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Notes:
- Variables must be prefixed with VITE_ to be exposed to the client.
- Restart the dev server after changing .env.

## Available scripts

- npm run dev — start Vite dev server
- npm run build — production build
- npm run preview — preview the build locally
- npm run lint — run ESLint
- npm run format — run Prettier

## Tech stack

- React 19, Vite 6
- Tailwind CSS 4
- React Router DOM 7
- Socket.io Client 4
- Framer Motion, React Hot Toast, Lucide React

## Backend connection

The app communicates with the Node/Express + Socket.io backend in ../Backend.
Ensure the backend is running and CORS allows your frontend origin (localhost:5173 during development; hotspotmithran.vercel.app in production).

## Deploy (Vercel)

1) Connect your repo to Vercel
2) Set the build environment variable:
	- VITE_GOOGLE_CLIENT_ID = your prod client ID
3) Deploy. The site will be available at your Vercel domain.

## Troubleshooting

- Google sign-in not opening: check VITE_GOOGLE_CLIENT_ID and authorized origins in Google Cloud Console.
- Messages not appearing: make sure the backend is running and reachable; confirm CORS allows the frontend origin.
- Tailwind styles missing: restart dev server; ensure index.css is imported in main.jsx.
- Env var not read: ensure the VITE_ prefix and restart dev server.

## More

For full project documentation, see the root README: ../README.md
