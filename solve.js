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

// // Game 2 (214,117 - 215,947 ms)|(33,909 - 33,790 ms)|(28,349 - 28,283 ms)|(3,186 - 3,208 ms)
// let piece = new Piece('B', 5, 2);
// piece.position = ['BB1B', 'BB1C', 'BB1D', 'BO2B', 'BO2C'];
// let board = new Board(['Y3A', 'B7A', 'G5B', 'G5C', 'Y3D', 'R7D']);
// let game = new Game(board);
// game.putPieceOnBoard(piece);

// // Game 3 (15-18 ms)
// let piece = new Piece('G', 4, 2);
// piece.position = ['GO1A', 'GG2A', 'GG3A', 'GO2B'];
// let board = new Board(['G6A', 'B7A', 'Y5B', 'G6B', 'R4C', 'Y5C', 'B4D']);
// let game = new Game(board);
// game.putPieceOnBoard(piece);

// Game 4 (11-13 ms)
let piece = new Piece('G', 3, 2);
piece.position = ['GO7A', 'GO8A', 'GG8B'];
let board = new Board(['G3A', 'R2B', 'G4B', 'B2C', 'B4C', 'Y3D']);
let game = new Game(board);
game.putPieceOnBoard(piece);

console.log('Initial board:');
game.board.print();
// console.log('Pieces:');
// console.log(game.pieces);    

let freePins = board.getFreePins();
// console.log('Pins:');
// console.log(freePins);

var t0 = performance.now();
game.solve();
var t1 = performance.now();
console.log("Call to solve() took " + (t1 - t0) + " milliseconds.");

if (game.gameOver) {
    console.log('Solved!');
    game.board.print();
}