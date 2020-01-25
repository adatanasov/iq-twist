import Game from './game.js';
import Board from './board.js';
import Piece from './piece.js';
import Pin from './pin.js';

let piece = new Piece('G', 4, 2);
piece.position = ['GO4C', 'GG3D', 'GG4D', 'GO5D'];

let board = new Board(['R6B', 'G3C', 'B2B', 'B1C', 'Y4B', 'Y5C']);
board.putPiece(piece);
board.print();

let game = new Game(board);
game.removePieceById(piece.id);
console.log(game.pieces);    

console.log(board.getFreePins());

//console.log(board._canFit(pieces[2].plan, 2, 0, freePins[3]));