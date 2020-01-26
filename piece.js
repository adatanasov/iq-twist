export class Piece {
    constructor(color, area, holes, plan) {
        this.color = color;
        this._area = area;
        this._holes = holes;
        this.plan = plan;
        this.id = `${this.color}${this._area}${this._holes}`;
        this.position = [];
    }
}