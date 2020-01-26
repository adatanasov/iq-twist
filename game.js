import { Piece } from './piece.js';

export class Game {
    constructor(board) {
        this.board = board;
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

    get pieces() {
        return this._pieces;
    }

    putPieceOnBoard(piece) {
        this.board.putPiece(piece);
        this._removePieceById(piece.id);
    }

    solve() {
        let isSingleOptionAvailable = true;
        while (isSingleOptionAvailable) {
            let pinOptions = this._getAvailablePiecesForPins();
            let singleOptions = this._getSingleOptions(pinOptions);
            isSingleOptionAvailable = singleOptions.length > 0;

            if (isSingleOptionAvailable) {
                this._putSingleOptions(singleOptions)
                this.board.print();
            }
        }
        // +for each free pin try to put same colored pieces
        // if there is only 1 possible position pieces on a pin -> put it
        // after each piece put -> re-evaluate and save all possible positions on pins

        // start with the pin with least possible positions
        // put piece on first, re-evaluate
        // continue until not possible move or win
    }

    _getAvailablePiecesForPins() {
        let freePins = this.board.getFreePins();
        let pinOptions = [];
        for (let i = 0; i < freePins.length; i++) {
            pinOptions[i] = [];
            let pin = freePins[i];
            let availablePieces = this._pieces.filter(p => p.color === pin.color);
            for (let pi = 0; pi < availablePieces.length; pi++) {
                let piece = availablePieces[pi];
                let piecePinResult = this.board.tryPieceOnPin(piece, pin);
                if (piecePinResult.some(p => p)) {
                    pinOptions[i].push(piecePinResult);
                }
            }
        }

        console.log(pinOptions);
        return pinOptions;
    }

    _getSingleOptions(pinOptions) {
        return pinOptions.filter(o => o.length === 1 && o[0].length === 1);
    }

    _isSingleOptionAvailable(pinOptions) {
        return pinOptions.some(o => o.length === 1 && o[0].length === 1);
    }

    _putSingleOptions(singleOptions) {
        for (let i = 0; i < singleOptions.length; i++) {
            let option = singleOptions[i][0][0];
            this.board.putPinOption(option);
            this._removePieceById(option.piece.id);
        }
    }

    _removePieceById(id) {
        this._pieces = this._pieces.filter(p => p.id !== id);
    }
}