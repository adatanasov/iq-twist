import Board from './board.js';
import Piece from './piece.js';
import Pin from './pin.js';

let piece1 = new Piece('G', 4, 2);
piece1.position = ['GO4C', 'GG3D', 'GG4D', 'GO5D'];

let board1 = new Board(
    ['R6B', 'G3C', 'B2B', 'B1C', 'Y4B', 'Y5C'], 
    [piece1]);

board1.print();

let pieces = board1.pieces;
console.log(pieces);    

let freePins = board1._getFreePins();
console.log(freePins);

console.log(board1._canFit(pieces[2].plan, 2, 0, freePins[3]));