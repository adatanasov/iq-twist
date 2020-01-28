import { Pin } from "./pin.js";
import { PinOption } from "./PinOption.js";

export class Board {
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

    putPinOption(pinOption) {
        let plan = pinOption.plan;
        let pin = pinOption.pin;
        let x = pinOption.x;
        let y = pinOption.y;

        for (let i = 0; i < plan.length; i++) {
            for (let j = 0; j < plan[i].length; j++) {
                this._putOnBoard(plan[i][j], pin.x - x + i, pin.y - y + j);
            }
        }
    }

    _putOnBoard(content, x, y) {
        if (this._isContentEmpty(content)) {
            return;
        }

        if (this._isPositionEmpty(x, y)) {
            let updatedContent = content.length === 1 ? content + content : content;
            this._state[x][y] = updatedContent;
            return;
        }

        if (this._isPositionPin(x, y) && this._canPutOnPin(content, x, y)) {
            this._state[x][y] = content + this._state[x][y];
            return;
        }

        console.error(`Can't put ${content} on position ${x},${y}`);
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
        let result = [];     
        for (let po = 0; po < 8; po++) { 
            for (let i = 0; i < currentPlan.length; i++) {
                for (let j = 0; j < currentPlan[i].length; j++) {
                    const element = currentPlan[i][j];
                    if (element.endsWith('O') && this.canFit(currentPlan, i, j, pin)) {
                        let option = new PinOption(piece, currentPlan.slice(0), i, j, pin)
                        result.push(option);
                    }
                }
            }
            
            if (po !== 3) {
                let newPlan = this._rotate(currentPlan, false);
                currentPlan = newPlan;
            } else {
                if (currentPlan.length === 1 || currentPlan[0].length === 1) {
                    break;
                }
                
                currentPlan = this._flip(currentPlan);
            }
        }

        return result;
    }

    tryPieceOnPosition(piece, pin) {
        let currentPlan = piece.plan; 
        let result = [];     
        for (let po = 0; po < 8; po++) { 
            for (let i = 0; i < currentPlan.length; i++) {
                for (let j = 0; j < currentPlan[i].length; j++) {
                    const element = currentPlan[i][j];
                    if (this.canFit(currentPlan, i, j, pin)) {
                        let option = new PinOption(piece, currentPlan.slice(0), i, j, pin)
                        result.push(option);
                    }
                }
            }
            
            if (po !== 3) {
                let newPlan = this._rotate(currentPlan, false);
                currentPlan = newPlan;
            } else {
                if (currentPlan.length === 1 || currentPlan[0].length === 1) {
                    break;
                }
                
                currentPlan = this._flip(currentPlan);
            }
        }

        return result;
    }

    canFit(plan, x, y, pin) {
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

    _rotate(plan) {
        let toRotate = plan.slice(0);
        let result = [];

        for (let col = 0; col < toRotate[0].length; col++) {
            result.push([]);
        }

        for (let i = 0; i < toRotate.length; i++) {
            for (let j = 0; j < toRotate[i].length; j++) {
                result[j].unshift(toRotate[i][j]);
            }
        }
        return result;
    }

    _flip(plan) {
        let toFlip = plan.slice(0);
        let result = [];

        for (let i = 0; i < toFlip.length; i++) {
            result[i] = toFlip[i].slice(0).reverse();
        }

        return result;
    }

    _canPutOnPosition(content, x, y) {
        if (this._isPositionEmpty(x, y) || this._isContentEmpty(content)) {
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

    _isContentEmpty(content) {
        return content === ' ';
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