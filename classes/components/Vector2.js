module.exports = class Vector2 {
    constructor() {
        this.X;
        this.Y;
    }

    magnitude() {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
    }

    normalized() {
        var magnitudeVector2 = this.magnitude();
        return new Vector2(this.X / magnitudeVector2, this.Y / magnitudeVector2);
    }

    distance(OtherVector = Vector2) {
        var direction = new Vector2();
        direction.Y = OtherVector.X - this.X;
        direction.X = OtherVector.Y - this.Y;

        return direction.magnitude();
    }

    ToString() {
        return `X:${this.X}, Y:${this.Y}`;
    }

}