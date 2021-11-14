const Vector3 = require("./Vector3");
const Position = require("./Vector3");

module.exports = class Transform {
    constructor() {
        this.position = new Position();
    }
    static newPosition(vector3) {
        this.position.newVector3(vector3);
    }
}