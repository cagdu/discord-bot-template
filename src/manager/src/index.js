const { Client, EmbedBuilder } = require("discord.js");
const { createPool } = require("mysql");

const config = x => require(`../../../config/${x}.json`), data = x => require(`../../../data/${x}.json`);

class Base {
    development = data("conf").development;
    language = data("conf").defaultLang;
    log(message = "", platform = "default", type = "log", colors = config("log-colors")) { console[type](`[ ${new Date().getTime()} ][ ${colors.types[type]} ] • [ ${colors.pl[platform]} ]> ${message}`) };
}

class Modules extends Base {
    embed(options, embed) { embed = new EmbedBuilder(options); if (!options.color) { embed.color = "#2f3136"; }; return embed; }
}

class Struct extends Base {
    discord(conf) { if (!conf) conf = data("discord"); let client = new Client(conf.client); client.once("ready", () => { this.log(`${client.user.tag} online`, "discord"); if (conf.presence) client.user.setPresence(conf.presence) }); client.commands = []; client.login(conf.token); return client; }
    mysql(PoolConfig) { if (!PoolConfig) PoolConfig = data("mysql"); let pool = createPool(PoolConfig); pool.getConnection((e) => { if (e) { this.log(e, "mysql", "error"); pool.end(() => { }) } else this.log("Connection successful", "mysql"); }); return pool; }
}

class Util extends Base {
    struct = new Struct();
    modules = new Modules();
}

class Manager extends Util {
    lang = function (key, values = [], locate = "tr-TR", msg = "") { locate = config(`lang/${locate}`); if (!locate) locate = config(`lang/tr-TR`); if (typeof values === "string") msg = String(locate[key]).replace("$0", values); else if (typeof values === "object") { msg = locate[key]; values.forEach((x, i) => msg = String(msg).replace(`$${i}`, x)); }; return msg }

    /** @private */
    poolConnection = this.struct.mysql();
    database = (q) => new Promise(resolve => { this.poolConnection.query(q, (e, r) => { if (e) return resolve({ data: [], error: true, msg: e }); else return resolve({ data: r, error: false, msg: null }) }) })
}

module.exports = { Manager };
