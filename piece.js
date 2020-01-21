class Piece {
    constructor(color, area, holes, plan) {
        this._color = color;
        this._area = area;
        this._holes = holes;
        this._plan = plan;
        this._id = `${this._color}${this._area}${this._holes}`;
    }

    get id() {
        return this._id;
    }

    get position() {
        return this._position;
    }

    set position(newPosition) {
        this._position = newPosition;
    }
}

export default Piece