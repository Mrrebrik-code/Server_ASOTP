const shortId = require("shortid");
const Vector3 = require("./core/Vector3");

module.exports = class Player {
    constructor() {
        this.nickName = "default_player";
        this.id = shortId.generate();
        this.position = new Vector3();
    }
}