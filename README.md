# Battleship Game

A simple and minimalistic implementation of the classic Battleship game. This project is developed using HTML, CSS, and JavaScript, with optional backend functionality for multiplayer gameplay.

## Features

- **Single-player Mode**: Play against an AI opponent with randomly placed ships.
- **Multiplayer Mode**: Create a game lobby with a shareable URL to play with a friend online.
- **Game Rules**: Standard Battleship rules with a 10x10 grid and classic ship types.
- **Minimal UI**: A clean, straightforward interface for intuitive gameplay.

## How It Works

### Setup
- Players place ships on their board using drag-and-drop.
- Ships are restricted to the grid and cannot overlap.

### Gameplay
- Players take turns firing shots at the opponent’s grid.
- Hits and misses are visually indicated on the board.

### Endgame
- The game ends when one player destroys all of the opponent’s ships.
- A victory/defeat screen is displayed with an option to start a new game.

## Multiplayer Details

- A host player can create a game lobby and receive a unique URL to invite an opponent.
- Turns are managed server-side to ensure fairness.
- Players can reconnect to the match if disconnected, as game states are saved.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend (Multiplayer - not yet implemented)**: Node.js, WebSocket for real-time communication
- **Hosting (not yet implemented)**: Can be self-hosted on a home server

## To-Do List

- Fix the reset button functionality.
- Enhance the AI logic for a more challenging single-player experience.
- Improve the overall style and user interface.
- Design a more engaging endgame screen.
- Implement backend support for multiplayer gameplay.

## License

Distributed under the MIT License. See `LICENSE` for more information.
