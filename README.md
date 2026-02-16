# Battleship Game

A classic Battleship game built with vanilla JavaScript, HTML, and CSS using Test-Driven Development (TDD).

## 🎮 Features

- **Two-player gameplay** (Human vs Computer)
- **Random ship placement** for quick game start
- **Smart attack tracking** - prevents duplicate attacks
- **Visual feedback** - hits (💥) and misses (◦) clearly marked
- **Win/loss detection** - game ends when all ships are sunk
- **Responsive design** - works on desktop and mobile

## 🛠️ Built With

- **JavaScript (ES6 Modules)** - Game logic
- **HTML5** - Structure
- **CSS3** - Styling with Grid and Flexbox
- **Jest** - Testing framework (22 tests, all passing ✅)

## 🚀 How to Play

1. Open `index.html` in your browser
2. Click **"Random Ship Placement"** to place your ships
3. Click **"Start Game"** to begin
4. Click on the enemy board to attack
5. Sink all enemy ships to win!

## 🧪 Running Tests
```bash
npm install
npm test
```

## 📂 Project Structure
```
battleship-game/
├── ship.js              # Ship class
├── ship.test.js         # Ship tests
├── gameboard.js         # Gameboard class
├── gameboard.test.js    # Gameboard tests
├── player.js            # Player class
├── player.test.js       # Player tests
├── game.js              # Game logic & DOM
├── index.html           # HTML structure
├── style.css            # Styling
└── README.md            # This file
```

## 🎯 What I Learned

- **Test-Driven Development (TDD)** - Writing tests first
- **Object-Oriented Programming** - Classes and encapsulation
- **DOM Manipulation** - Event handling and dynamic rendering
- **Game Logic** - Turn-based gameplay and win conditions
- **Git Workflow** - Conventional commits and clean history

## 🔮 Future Enhancements

- [ ] Drag-and-drop ship placement
- [ ] Smarter AI (hunt mode after hitting a ship)
- [ ] 2-player mode (pass-and-play)
- [ ] Sound effects
- [ ] Animation for attacks

## 👨‍💻 Author

Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## 📝 License

MIT License - feel free to use this project for learning!