import Piece from "./piece.js";
import Pin from "./pin.js";

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
            new Piece('G', 4, 2, [['GO','G','G'],[' ','GO',' ']]),
            new Piece('R', 4, 2, [['RO',' '],['R',' '],['RO','R']]),
            new Piece('Y', 5, 3, [[' ','Y',' '],['YO','Y',' '],[' ','YO','YO']]),
            new Piece('B', 4, 1, [['B','B','BO','B']]),
            new Piece('Y', 3, 1, [['Y','Y','YO']]),
            new Piece('B', 5, 2, [['B','B','B'],[' ','BO','BO']]),
            new Piece('R', 4, 1, [[' ','R'],['R','RO'],['R',' ']]),
            new Piece('G', 3, 2, [[' ','G'],['GO','GO']])
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

    solve() {
        let freePins = this._getFreePins();
        for (let i = 0; i < freePins.length; i++) {
            const pin = freePins[i];
            const availablePieces = this._pieces.filter(p => p.color == pin.color);
            for (let pi = 0; pi < availablePieces.length; pi++) {
                const piece = availablePieces[pi];
                let piecePinResult = this._tryPieceOnPin(piece, pin);
            }
        }
        // +for each free pin try to put same colored pieces
        // if there is only 1 possible position pieces on a pin -> put it
        // after each piece put -> re-evaluate and save all possible positions on pins

        // start with the pin with least possible positions
        // put piece on first, re-evaluate
        // continue until not possible move or win
    }

    _tryPieceOnPin(piece, pin) {
        let currentPlan = piece.plan;   
        result = [];     
        for (let po = 0; po < 8; po++) {            
            for (let i = 0; i < currentPlan.length; i++) {
                for (let j = 0; j < currentPlan[i].length; j++) {
                    const element = currentPlan[i][j];
                    if (element.endsWith('O') && this._canFit(currentPlan, i, j, pin)) {
                        result.push([currentPlan, i, j, pin]);
                    }
                }
            }
            
            // rotate, if po === 3, turn
        }
    }

    _canFit(plan, x, y, pin) {
        const neededOnLeft = y;
        const neededOnTop = x;
        const neededOnRight = plan[0].length - 1 - y;
        const neededOnBottom = plan.length - 1 - x;

        const minX = 0
        const maxX = 3;
        const minY = 0;
        const maxY = 7;

        if (pin.y - neededOnLeft < minY) {
            return false; // can't fit on the left
        }

        if (pin.x - neededOnTop < minX) {
            return false; // can't fit on the top
        }

        if (pin.y + neededOnRight > maxY) {
            return false; // can't fit on the right
        }

        if (pin.x + neededOnBottom > maxX) {
            return false; // can't fit on the bottom
        }
        
        for (let i = 0; i < plan.length; i++) {
            for (let j = 0; j < plan[i].length; j++) {
                const content = plan[i][j];
                if (!this._canPutOnPosition(content, pin.x - x + i, pin.y - y + j)) {
                    return false;
                }
            }
        }

        return true;
    }

    _getFreePins() {
        let result = [];
        for (let i = 0; i < this._state.length; i++) {
            for (let j = 0; j < this._state[i].length; j++) {
                if (this._isContentPin(this._state[i][j])) {
                    result.push(new Pin(this._state[i][j], i, j));
                }
            }
        }

        return result;
    }

    _canPutOnPosition(content, x, y) {
        if (this._isPositionEmpty(x, y) || content === ' ') {
            return true;
        }

        if (this._isPositionPin(x, y) && this._canPutOnPin(content, x, y)) {
            return true;
        }

        return false;
    }

    _isPositionEmpty(x, y) {
        return this._state[x][y] === ' ';
    }

    _isPositionPin(x, y) {
        return this._state[x][y] !== ' ' && this._state[x][y].length === 1;
    }

    _isContentPin(content) {
        return content !== ' ' && content.length === 1;
    }

    _canPutOnPin(content, x, y) {
        return content.endsWith('O') && content[0] === this._state[x][y];
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