const { Client, Message } = require("discord.js"), { Manager } = require("../../src/manager");

/** @param {Client} client @param {Manager} manager @param {Message} message  */
module.exports = (client, manager, message) => {
    if (message.inGuild() && message.author.bot === false) {

    }
}