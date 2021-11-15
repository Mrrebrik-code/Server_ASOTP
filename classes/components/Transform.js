const Vector3 = require("./Vector3");

module.exports = class Transform {
    constructor() {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3();
    }
}