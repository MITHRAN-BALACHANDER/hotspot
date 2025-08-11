# Hotspot Backend (Node.js + Express + Socket.io)

Real-time chat server powering the Hotspot app. Provides room-based messaging over Socket.io with simple in-memory user tracking.

## Requirements

- Node.js 18+

## Setup

```bash
# from repo root
cd Backend
npm install

# development (with nodemon)
npm run dev

# production
npm start
```

Server starts at http://localhost:199 by default. Set PORT to override.


## Architecture

- Express app (no REST endpoints by default)
- Socket.io server for real-time events
- In-memory user store in `entity.js` (no database)
	- addUsers(id, name, room)
	- removeUser(id)
	- getUser(id)

Note: The in-memory store resets on server restart and is not suitable for multiple instances without a shared store.

## Socket API

Namespace: default (`/`)

Events and payloads:

1) Client → Server: `join`

- Payload: `{ name: string, room: string }`
- Ack: `callback(error?: string)` — called with an error message on failure; called with no args on success.
- Behavior:
	- Validates inputs; lowercases/trim both name and room
	- Prevents duplicate name within the same room
	- Joins the socket into the room
	- Emits to the joining client:
		- `toastmessage`: `{ user: 'admin', text: 'Welcome, <name>!' }`
		- `message`: `{ user: 'admin', text: 'You joined the room <room>' }`
	- Broadcasts to others in the room:
		- `toastmessage`: `{ user: 'admin', text: '<name> has joined' }`
		- `message`: `{ user: 'admin', text: '<name> has joined' }`


2) Client → Server: `sendMessage`

- Payload: `message: string`
- Ack: `callback(error?: string)` — called with no args on success; error string if user not found.
- Behavior:
	- Looks up the user by socket.id
	- Emits to the user’s room:
		- `message`: `{ user: '<name>', text: '<message>' }`

3) Disconnect

- On socket disconnect, if a tracked user existed, broadcasts to the room:
	- `message`: `{ user: 'admin', text: '<name> has left' }`

## Message shapes

- `message`:
	```json
	{ "user": string, "text": string }
	```
- `toastmessage`:
	```json
	{ "user": "admin", "text": string }
	```

## Example client usage (socket.io-client)

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
	transports: ['websocket'],
});

socket.on('connect', () => {
	socket.emit('join', { name: 'alice', room: 'general' }, (err) => {
		if (err) console.error('Join error:', err);
	});
});

socket.on('message', (msg) => {
	console.log('message:', msg);
});

socket.on('toastmessage', (toast) => {
	console.log('toast:', toast);
});

// send a message
socket.emit('sendMessage', 'Hello everyone!', (err) => {
	if (err) console.error('Send error:', err);
});
```

## Files

- `server.js` — Express + Socket.io server and event handlers
- `entity.js` — user management helpers (add, remove, get)
- `package.json` — scripts and dependencies

## License

ISC (see repository root LICENSE)