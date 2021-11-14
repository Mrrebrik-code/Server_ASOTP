module.exports = class Vector3 {
    constructor() {
        this.X;
        this.Y;
        this.Z;
    }

    newVector3(vector3) {
        this.X = vector3.X;
        this.Y = vector3.Y;
        this.Z = vector3.Z;
    }
    magnitude() {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
    }

    normalized() {
        var magnitudeVector3 = this.magnitude();
        return new Vector3(this.X / magnitudeVector3, this.Y / magnitudeVector3, this.Z / magnitudeVector3);
    }

    distance(OtherVector = Vector3) {
        var direction = new Vector3();
        direction.X = OtherVector.x - this.X;
        direction.Y = OtherVector.y - this.Y;
        direction.Z = OtherVector.z - this.Z;

        return direction.magnitude();
    }

    ToString() {
        return `X:${this.X}, Y:${this.Y}, Z${this.Z}`;
    }

}