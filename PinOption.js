export class PinOption {
    constructor(piece, plan, x, y, pin) {
        this.piece = piece;
        this.plan = plan;
        this.x = x;
        this.y = y;
        this.pin = pin;
    }

    equals(option) {
        if (this.piece.id === option.piece.id
            && JSON.stringify(this.plan) === JSON.stringify(option.plan)
            && this.x === option.x
            && this.y === option.y
            && this.pin.equals(option.pin)) {
            return true;
        }

        return false;
    }
}