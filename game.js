import Board from './board.js';
import Piece from './piece.js';
import Pin from './pin.js';

class Game {
    constructor(board) {
        this._board = board;
        this._pieces = [
            new Piece('G', 4, 2, [['GO','G','G'],[' ','GO',' ']]),
            new Piece('R', 4, 2, [['RO',' '],['R',' '],['RO','R']]),
            new Piece('Y', 5, 3, [[' ','Y',' '],['YO','Y',' '],[' ','YO','YO']]),
            new Piece('B', 4, 1, [['B','B','BO','B']]),
            new Piece('Y', 3, 1, [['Y','Y','YO']]),
            new Piece('B', 5, 2, [['B','B','B'],[' ','BO','BO']]),
            new Piece('R', 4, 1, [[' ','R'],['R','RO'],['R',' ']]),
            new Piece('G', 3, 2, [[' ','G'],['GO','GO']])
        ];
    }

    get board() {
        return this._board;
    }

    get pieces() {
        return this._pieces;
    }

    removePieceById(id) {
        this._pieces = this._pieces.filter(p => p.id !== id);
    }

    solve() {
        let freePins = this._board.getFreePins();
        for (let i = 0; i < freePins.length; i++) {
            const pin = freePins[i];
            const availablePieces = this._pieces.filter(p => p.color == pin.color);
            for (let pi = 0; pi < availablePieces.length; pi++) {
                const piece = availablePieces[pi];
                let piecePinResult = this.board.tryPieceOnPin(piece, pin);
            }
        }
        // +for each free pin try to put same colored pieces
        // if there is only 1 possible position pieces on a pin -> put it
        // after each piece put -> re-evaluate and save all possible positions on pins

        // start with the pin with least possible positions
        // put piece on first, re-evaluate
        // continue until not possible move or win
    }
}

export default Game