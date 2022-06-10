module.exports.options = {
    name: "dev",
    defaultPermission: false,
    description: "Geliştirici komutu",
    options: [
        { name: "stats", description: "Bot bilgilerini gösterir", type: 1 },
        { name: "restart", description: "Botu yeniden başlatır", type: 1 }
    ]
}

const { Client, Interaction } = require("discord.js"), { Manager } = require("../../../src/manager");
/** @param {Client} client @param {Interaction} interaction @param {Manager} manager */
module.exports.run = async (client, manager, interaction, options) => {
    let arg = interaction.options["_hoistedOptions"], opt = {};

    switch (interaction.options["_group"]) {
        default: switch (interaction.options["_subcommand"]) {
            case "stats":
                let dbping = new Date().getTime(), q = await manager.database("SELECT 1"); dbping = (new Date().getTime()) - dbping;
                return interaction.reply({ embeds: [manager.modules.embed({ description: manager.lang("slash-dev_stats-desc", [interaction.client.ws.ping, dbping]) })], ephemeral: true });
            case "restart":
                await manager.log(manager.lang("log-restart", interaction.user.tag), "discord");
                await interaction.reply({ embeds: [manager.modules.embed({ description: manager.lang("slash-dev_restart") })], ephemeral: true });
                process.exit(0);
        }
    }
}