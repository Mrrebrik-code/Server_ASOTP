const shortId = require("shortid");
const Transform = require("./core/Transform.js");

module.exports = class Player {
    constructor() {
        this.nickName = "default_player";
        this.id = shortId.generate();
        this.transform = new Transform();
    }


}