import Board from './board.js';
import Piece from './piece.js';

let piece1 = new Piece('G', 4, 2);
piece1.position = ['GO4C', 'GG3D', 'GG4D', 'GO5D'];

let board1 = new Board(
    ['R6B', 'G3C', 'B2B', 'B1C', 'Y4B', 'Y5C'], 
    [piece1]);

console.log(board1.pieces);    
board1.print();
console.log(board1._getFreePins());