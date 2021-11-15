const shortId = require("shortid");
const Transform = require("./Components/Transform.js");

module.exports = class Player {
    constructor() {
        this.nickName = "default_player";
        this.id = shortId.generate();
        this.transform = new Transform();
        this.lobby = 0;
    }

    displayPalyerInformation() {
        let player = this;
        return `(${player.nickName} : ${palyer.id})`;
    }
}