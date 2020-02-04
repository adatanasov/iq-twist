import { Game } from './game.js';
import { Board } from './board.js';
import { Piece } from './piece.js';
import { Pin } from './pin.js';

// // Game 1 (11-16 ms)|(9-15 ms)|(9-11 ms)|(10-13 ms)
// let piece = new Piece('G', 4, 2);
// piece.position = ['GO4C', 'GG3D', 'GG4D', 'GO5D'];
// let board = new Board(['R6B', 'G3C', 'B2B', 'B1C', 'Y4B', 'Y5C']);
// let game = new Game(board);
// game.putPieceOnBoard(piece);

// // Game 2 (214,117 - 215,947 ms)|(33,909 - 33,790 ms)|(28,349 - 28,283 ms)|(3,186 - 3,208 ms)|(1,543 - 1,548 ms)|(69 - 125 ms)
// let piece = new Piece('B', 5, 2);
// piece.position = ['BB1B', 'BB1C', 'BB1D', 'BO2B', 'BO2C'];
// let board = new Board(['Y3A', 'B7A', 'G5B', 'G5C', 'Y3D', 'R7D']);
// let game = new Game(board);
// game.putPieceOnBoard(piece);

// Game 3 (15-18 ms)
let piece = new Piece('G', 4, 2);
piece.position = ['GO1A', 'GG2A', 'GG3A', 'GO2B'];
let board = new Board(['G6A', 'B7A', 'Y5B', 'G6B', 'R4C', 'Y5C', 'B4D']);
let game = new Game(board);
game.putPieceOnBoard(piece);

// // Game 4 (11-13 ms)
// let piece = new Piece('G', 3, 2);
// piece.position = ['GO7A', 'GO8A', 'GG8B'];
// let board = new Board(['G3A', 'R2B', 'G4B', 'B2C', 'B4C', 'Y3D']);
// let game = new Game(board);
// game.putPieceOnBoard(piece);

// // Game 38 (15,311 ms)|(19,077 - 19,358  ms)|(12,498 - 12,146 ms)
// let board = new Board(['R2B', 'Y2C']);
// let game = new Game(board);

// // Game 120 (29,943 ms)
// let board = new Board(['G5A', 'B5C', 'R6D']);
// let game = new Game(board);

// console.log('Initial board:');
// game.board.print();
game.board.draw("initial");
// console.log('Pieces:');
// console.log(game.pieces);    

// let freePins = board.getFreePins();
// console.log('Pins:');
// console.log(freePins);

var t0 = performance.now();
game.solve();
var t1 = performance.now();
// console.log("Call to solve() took " + (t1 - t0) + " milliseconds.");
let timeElement = document.getElementById("time");
timeElement.textContent = (t1 - t0) / 1000 + 'sec';

if (game.gameOver) {
    // game.board.print();
    game.board.draw("final");
}