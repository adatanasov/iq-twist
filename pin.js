export class Pin {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    equals(pin) {
        if (this.color === pin.color
            && this.x === pin.x
            && this.y == pin.y) {
            return true;
        }

        return false;
    }
}