export class Piece {
    constructor(color, area, holes, plan) {
        this.color = color;
        this.area = area;
        this.holes = holes;
        this.plan = plan;
        this.id = `${this.color}${this.area}${this.holes}`;
        this.position = [];
    }
}