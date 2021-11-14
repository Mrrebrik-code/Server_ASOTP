module.exports = class Vector2 {
    constructor() {
        this.x;
        this.y;
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalized() {
        var magnitudeVector2 = this.magnitude();
        return new Vector2(this.x / magnitudeVector3, this.y / magnitudeVector3);
    }

    distance(OtherVector = Vector2) {
        var direction = new Vector2();
        direction.x = OtherVector.x - this.x;
        direction.y = OtherVector.y - this.y;

        return direction.magnitude();
    }

    ToString() {
        return `X:${this.x}, Y:${this.y}`;
    }

}