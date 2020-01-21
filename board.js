import Piece from "./piece.js";

class Board {
    constructor(pins, initialPieces) {
        this._pins = pins;
        this._initialPieces = initialPieces;
        this._state = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];
        this._pieces = [
            new Piece('G', 4, 2, [['O','G','G'],[' ','O',' ']]),
            new Piece('R', 4, 2, [['O',' '],['R',' '],['O','R']]),
            new Piece('Y', 5, 3, [[' ','Y',' '],['O','Y',' '],[' ','O','O']]),
            new Piece('B', 4, 1, [['B','B','O','B']]),
            new Piece('Y', 3, 1, [['Y','Y','O']]),
            new Piece('B', 5, 2, [['B','B','B'],[' ','O','O']]),
            new Piece('R', 4, 1, [[' ','R'],['R','O'],['R',' ']]),
            new Piece('G', 3, 2, [[' ','G'],['O','O']])
        ];

        this._putPins(this._pins, this._state);
        this._putInitialPieces(this._initialPieces, this._state);
        this._removeInitialFromPieces(this._initialPieces, this._pieces);
    }

    get pieces() {
        return this._pieces;
    }

    print() {
        console.table(this._state);
    }

    _putPins(pins, state) {
        for (let i = 0; i < pins.length; i++) {
            const pin = pins[i];
            this._setState(pin, state);
        }
    }

    _putInitialPieces(initialPieces, state) {
        for (let i = 0; i < initialPieces.length; i++) {
            const piece = initialPieces[i];
            for (let j = 0; j < piece.position.length; j++) {
                const part = piece.position[j];
                this._setState(part, state);
            }
        }
    }

    _removeInitialFromPieces(initialPieces, pieces) {
        for (let i = 0; i < initialPieces.length; i++) {
            const initialPiece = initialPieces[i];
            for (let j = 0; j < pieces.length; j++) {
                const piece = pieces[j];
                if (initialPiece.id === piece.id) {
                    pieces.splice(j, 1);
                    break;
                }
            }
        }
    }

    _setState(value, state) {
        const color = value.substring(0, value.length - 2);
        const column = value[value.length - 2] - 1;
        const row = this._getRow(value[value.length - 1]);

        state[row][column] = color;
    }

    _getRow(rawRow) {
        switch (rawRow) {
            case 'A':
                return 0;
            case 'B':
                return 1;
            case 'C':
                return 2;
            case 'D':
                return 3;
            default:
                console.error('Unknown pin.');
                return;
        }
    }
}

export default Board