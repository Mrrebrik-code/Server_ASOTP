const shortId = require("shortid");
const Transform = require("./Components/Transform.js");

module.exports = class Player {
    constructor() {
        this.nickName = "default_player";
        this.id = shortId.generate();
        this.transform = new Transform();
        this.room = null;
    }

    displayPalyerInformation() {
        let player = this;
        return `(${player.nickName} : ${player.id})`;
    }
}