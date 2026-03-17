
♟️ Real-Time Chess Game

A real-time multiplayer chess application built using Node.js, Express, Socket.io, and chess.js. The project allows two players to play chess live while additional users can join as spectators and watch the game updates in real time.

The application manages player roles, validates moves using chess rules, and synchronizes the game board across all connected clients using WebSocket communication.

🚀 Features

Real-time multiplayer gameplay using WebSockets

Automatic assignment of White and Black players

Spectator mode for additional users

Drag-and-drop chess piece movement

Move validation using chess.js

Live board synchronization for all connected users

Turn-based gameplay enforcement

Automatic board flipping for black player view

🛠️ Tech Stack

Backend

Node.js

Express.js

Socket.io

chess.js

Frontend

HTML

CSS

JavaScript

⚙️ How It Works Server Side

The backend server is responsible for handling connections, managing player roles, validating moves, and broadcasting updates.

Key functionalities include:

Creating an Express server and initializing Socket.io

Managing player roles (white, black, spectator)

Validating chess moves using chess.js

Broadcasting game updates to all clients

Maintaining the current board state using FEN notation

backendSetup

Client Side

The frontend renders the chessboard and handles user interactions such as dragging and dropping pieces.

Key functionalities include:

Establishing WebSocket connection with the server

Rendering the chessboard dynamically

Enabling drag-and-drop piece movement

Sending move events to the server

Updating the board when receiving opponent moves or game state updates

frontendSetup

🎮 Gameplay Flow

A user connects to the server.

The server assigns the player either:

White

Black

Spectator

Players move pieces via drag and drop.

Moves are validated using chess rules.

Valid moves are broadcast to all connected clients.

The board updates in real time.
