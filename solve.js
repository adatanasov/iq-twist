import { Game } from './game.js';
import { Board } from './board.js';
import { Piece } from './piece.js';
import { Pin } from './pin.js';

let piece = new Piece('G', 4, 2);
piece.position = ['GO4C', 'GG3D', 'GG4D', 'GO5D'];

let board = new Board(['R6B', 'G3C', 'B2B', 'B1C', 'Y4B', 'Y5C']);

let game = new Game(board);
game.putPieceOnBoard(piece);
console.log('Initial board:');
game.board.print();
console.log('Pieces:');
console.log(game.pieces);    

let freePins = board.getFreePins();
console.log('Pins:');
console.log(freePins);

game.solve();

if (game.gameOver) {
    console.log('GAME OVER!');
    game.board.print();
}

// let plan = [['R','RO'],[' ','R'],[' ','RO']];
// console.table(plan);
// let rotation1 = board._rotate(plan);
// console.table(rotation1);

//console.log(board.tryPieceOnPin(game.pieces[4], freePins[0]));

//console.log(board._canFit(game.pieces[2].plan, 0, 2, freePins[3]));

// let plan = [['1','2'],['3','4']];
// console.table(plan);
// let rotation1 = board._rotate(plan);
// console.table(rotation1);
// let rotation2 = board._rotate(rotation1);
// console.table(rotation2);
// let rotation3 = board._rotate(rotation2);
// console.table(rotation3);
// let rotation4 = board._flip(rotation3);
// console.table(rotation4);
// let rotation5 = board._rotate(rotation4);
// console.table(rotation5);
// let rotation6 = board._rotate(rotation5);
// console.table(rotation6);
// let rotation7 = board._rotate(rotation6);
// console.table(rotation7);