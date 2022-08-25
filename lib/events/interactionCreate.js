const { Client, Interaction } = require("discord.js"), { Manager } = require("../../src/manager");

/** @param {Client} client @param {Manager} manager @param {Interaction} interaction  */
module.exports = (client, manager, interaction) => {
    if (interaction.applicationId !== client.user.id) return;

    let a = (f) => { try { if (manager.development) { delete require.cache[require.resolve(`../commands/${f}`)]; }; return require(`../commands/${f}`) } catch (_) { manager.log("Interaction command error!\n" + _, "discord", "error"); return null; } },
        options = { locate: manager.language }, b = null, c = (d) => d.run(client, manager, interaction, options);

    if (interaction.isAutocomplete()) { b = a(`autocomplete/${interaction.customId}`); if (b) { c(b) } }
    else if (interaction.isButton()) { b = a(`button/${interaction.customId}`); if (b) { c(b) } }
    else if (interaction.isChatInputCommand()) { b = a(`slash/${interaction.commandName}`); if (b) { c(b) } }
    else if (interaction.isModalSubmit()) { b = a(`modal/${interaction.customId}`); if (b) { c(b) } }
    else if (interaction.isSelectMenu()) { b = a(`select-menu/${interaction.customId}`); if (b) { c(b) } }
}