module.exports = class Vector3 {
    constructor() {
        this.x;
        this.y;
        this.z;
    }
    static newVector3(vector3) {
        this.x = vector3.x;
        this.y = vector3.y;
        this.z = vector3.z;
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    normalized() {
        var magnitudeVector3 = this.magnitude();
        return new Vector3(this.x / magnitudeVector3, this.y / magnitudeVector3, this.z / magnitudeVector3);
    }

    distance(OtherVector = Vector3) {
        var direction = new Vector3();
        direction.x = OtherVector.x - this.x;
        direction.y = OtherVector.y - this.y;
        direction.z = OtherVector.z - this.z;

        return direction.magnitude();
    }

    ToString() {
        return `X:${this.x}, Y:${this.y}, Z${this.z}`;
    }

}