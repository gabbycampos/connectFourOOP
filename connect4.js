/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let gameOver = false;

class Game {
  constructor(HEIGHT, WIDTH, currPlayer1, currPlayer2) {
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;
    this.currPlayers = [currPlayer1, currPlayer2]
    this.currPlayer = currPlayer1;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    this.board = []
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const board = document.createElement('table');
    document.getElementById('game').append(board);

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`${this.currPlayer.color}`);
    piece.style.background = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */
  endGame(msg) {
    setTimeout(function() {
      alert(msg);
      gameOver = true;
    }, 500)
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    if (gameOver) {
      return;
    }
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;

    /** placeInTable: update DOM to place piece into HTML table of board */
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
  
    // Switch Players
    this.currPlayer = this.currPlayer === this.currPlayers[0] ? this.currPlayers[1] : this.currPlayers[0];
    
}
    /** checkForWin: check board cell-by-cell for "does a win start here?" */
checkForWin() {
  const _win = cells => cells.every( // starts wherever there are four mathing colors.
      ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        this.board[y][x] === this.currPlayer
    );


      // TODO: read and understand this code. Add comments to help you.
      // this is how the matching colors above should be positioned.
      // horiz: increments rows, vert: increments columns, diagDR: right direction, digL: left direction
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

          // checking for each possible win for a winner. 
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
  }

class Player {
  constructor(color) {
    this.color = color;
  }
}


document.getElementById('startGame').addEventListener('click', () => {
  let player1 = new Player(document.getElementById('player1').value);
  let player2 = new Player(document.getElementById('player2').value);
  new Game(6, 7, player1, player2);
});




// class Game {
//   constructor(HEIGHT = 6, WIDTH = 7, totalPlayers = 2) {
//     this.HEIGHT = HEIGHT;
//     this.WIDTH = WIDTH;
//     this.totalPlayers = totalPlayers;
//     this.currPlayer = 1; // Set first player. Previously it was undefined.
//     this.makeBoard();
//     this.makeHtmlBoard();
//   }

//   makeBoard() {
//     this.board = []
//     for (let y = 0; y < this.HEIGHT; y++) {
//       this.board.push(Array.from({ length: this.WIDTH }));
//     }
//   }

//   /** makeHtmlBoard: make HTML table and row of column tops. */
//   makeHtmlBoard() {
//     const board = document.createElement('table');
//     document.getElementById('game').append(board);

//     // make column tops (clickable area for adding a piece to that column)
//     const top = document.createElement('tr');
//     top.setAttribute('id', 'column-top');
//     top.addEventListener('click', this.handleClick.bind(this));

//     for (let x = 0; x < this.WIDTH; x++) {
//       const headCell = document.createElement('td');
//       headCell.setAttribute('id', x);
//       top.append(headCell);
//     }

//     board.append(top);

//     // make main part of board
//     for (let y = 0; y < this.HEIGHT; y++) {
//       const row = document.createElement('tr');

//       for (let x = 0; x < this.WIDTH; x++) {
//         const cell = document.createElement('td');
//         cell.setAttribute('id', `${y}-${x}`);
//         row.append(cell);
//       }

//       board.append(row);
//     }
//   }

//   /** findSpotForCol: given column x, return top empty y (null if filled) */
//   findSpotForCol(x) {
//     for (let y = this.HEIGHT - 1; y >= 0; y--) {
//       if (!this.board[y][x]) {
//         return y;
//       }
//     }
//     return null;
//   }

//   placeInTable(y, x) {
//     const piece = document.createElement('div');
//     piece.classList.add('piece');
//     piece.classList.add(`p${this.currPlayer}`);
//     piece.style.top = -50 * (y + 2);

//     const spot = document.getElementById(`${y}-${x}`);
//     spot.append(piece);
//   }

//   /** endGame: announce game end */
//   endGame(msg) {
//     alert(msg);
//     const top = document.querySelector("#column-top");
//     top.removeEventListener("click", this.handleClick.bind(this));
//   }

//   /** handleClick: handle click of column top to play piece */
//   handleClick(evt) {
//     // get x from ID of clicked cell
//     const x = +evt.target.id;

//     // get next spot in column (if none, ignore click)
//     const y = this.findSpotForCol(x);
//     if (y === null) {
//       return;
//     }

//     // place piece in board and add to HTML table
//     this.board[y][x] = this.currPlayer;

//     /** placeInTable: update DOM to place piece into HTML table of board */
//     this.placeInTable(y, x);

//     // check for win
//     if (this.checkForWin()) {
//       return this.endGame(`Player ${this.currPlayer} won!`);
//     }

//     // check for tie
//     if (this.board.every(row => row.every(cell => cell))) {
//       return this.endGame('Tie!');
//     }

//     // switch players
//     this.currPlayer += 1;
//     if (this.currPlayer > this.totalPlayers) this.currPlayer = 1; // If we've gone over the last player go back to player 1.
//   }

//   /** checkForWin: check board cell-by-cell for "does a win start here?" */
//   checkForWin() {
//     const _win = cells => {
//       // Check four cells to see if they're all color of current player
//       //  - cells: list of four (y, x) cells
//       //  - returns true if all are legal coordinates & all match currPlayer

//       cells.every(
//         ([y, x]) =>
//           y >= 0 &&
//           y < this.HEIGHT &&
//           x >= 0 &&
//           x < this.WIDTH &&
//           this.board[y][x] === this.currPlayer
//       );
//     }
//     for (let y = 0; y < this.HEIGHT; y++) {
//       for (let x = 0; x < this.WIDTH; x++) {
//         // get "check list" of 4 cells (starting here) for each of the different
//         // ways to win
//         const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//         const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//         const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//         const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//         // find winner (only checking each win-possibility as needed)
//         if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//           return true;
//         }
//       }
//     }
//   }
// }


// //new Game(6,7);
// document.getElementById('startGame').addEventListener('click', () => {
//   new Game(6, 7, 2);
// });

