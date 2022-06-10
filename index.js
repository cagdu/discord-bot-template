const manager = new (require("./src/manager").Manager)(), client = manager.struct.discord(), { readdir } = require("fs-extra");

readdir("./lib/events", (e, f) => f.forEach(file => { if (file.endsWith(".js")) { client.on(file.replace(".js", ""), (a, b) => require(`./lib/events/${file}`)(client, manager, a, b)) } }));

client.once("ready", () => {
    let commands = { slash: [], text: [] };
    ["slash", "text"].forEach(x => {
        readdir(`./lib/commands/${x}`, (e, f) => f.forEach(file => { if (file.endsWith(".js")) { commands[x].push(require(`./lib/commands/${x}/${file}`).options) } }));
        setTimeout(() => {
            if (x === "slash") { client.guilds.cache.forEach(guild => guild.commands.set(commands[x]).catch(_ => manager.log(`Slash command error on ${guild.name}`, "discord"))); manager.log("Slash commands has been set.", "discord") }
            else if (x === "text") { client.commands = commands[x]; manager.log("Text commands has been set.", "discord"); }
        }, 2000);
    })
});

module.exports = [{ script: "index.js", stop_exit_codes: [0] }]; // for pm2