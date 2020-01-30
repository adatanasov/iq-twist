import { Game } from './game.js';
import { Board } from './board.js';
import { Piece } from './piece.js';
import { Pin } from './pin.js';

// // Game 1
// let piece = new Piece('G', 4, 2);
// piece.position = ['GO4C', 'GG3D', 'GG4D', 'GO5D'];
// let board = new Board(['R6B', 'G3C', 'B2B', 'B1C', 'Y4B', 'Y5C']);
// let game = new Game(board);
// game.putPieceOnBoard(piece);

// Game 2
let piece = new Piece('B', 5, 2);
piece.position = ['BB1B', 'BB1C', 'BB1D', 'BO2B', 'BO2C'];
let board = new Board(['Y3A', 'B7A', 'G5B', 'G5C', 'Y3D', 'R7D']);
let game = new Game(board);
game.putPieceOnBoard(piece);

console.log('Initial board:');
game.board.print();
// console.log('Pieces:');
// console.log(game.pieces);    

let freePins = board.getFreePins();
// console.log('Pins:');
// console.log(freePins);

game.solve();

if (game.gameOver) {
    console.log('Solved!');
    game.board.print();
}