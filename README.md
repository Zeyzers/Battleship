# Battleship Game  

A simple and minimalistic implementation of the classic Battleship game. This project is developed using HTML, CSS, and JavaScript, with optional backend functionality for multiplayer gameplay.  

## Features  

- **Single-player Mode**: Play against an AI opponent with randomly placed ships.  
- **Multiplayer Mode**: Create a game lobby with a shareable URL to play with a friend online.  
- **Game Rules**: Standard Battleship rules with a 10x10 grid and classic ship types.  
- **Minimal UI**: A clean, straightforward interface for intuitive gameplay.  

## How It Works  

1. **Setup**:  
   - Players place ships on their board using drag-and-drop.  
   - Ships are restricted to the grid and cannot overlap.  

2. **Gameplay**:  
   - Players take turns firing shots at the opponent’s grid.  
   - Hits and misses are visually indicated on the board.  

3. **Endgame**:  
   - The game ends when one player destroys all of the opponent’s ships.  
   - A victory/defeat screen is displayed with an option to start a new game.  

## Multiplayer Details  

- A host player can create a game lobby and receive a unique URL to invite an opponent.  
- Turns are managed server-side to ensure fairness.  
- Players can reconnect to the match if disconnected, as game states are saved.  

## Tech Stack  

- **Frontend**: HTML, CSS, JavaScript  
- **Backend (Optional for Multiplayer)**: Node.js, WebSocket for real-time communication  
- **Hosting**: Can be self-hosted on a home server  
