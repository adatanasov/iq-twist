import Piece from "./piece.js";
import Pin from "./pin.js";

class Board {
    constructor(pins) {
        this._state = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];

        this._putPins(pins);
    }    

    get state() {
        return this._state;
    }

    print() {
        console.table(this._state);
    }

    putPiece(piece) {
        for (let i = 0; i < piece.position.length; i++) {
            const content = piece.position[i];
            this._setState(content, this._state);
        }
    }

    getFreePins() {
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

    tryPieceOnPin(piece, pin) {
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

    _putPins(pins) {
        for (let i = 0; i < pins.length; i++) {
            const pin = pins[i];
            this._setState(pin);
        }
    }

    _setState(content) {
        const color = content.substring(0, content.length - 2);
        const column = content[content.length - 2] - 1;
        const row = this._getRow(content[content.length - 1]);

        this._state[row][column] = color;
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