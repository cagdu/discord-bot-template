import { PoolConfig, PoolConnection, Query } from "mysql";
import { Client, ClientOptions, MessageEmbed, MessageEmbedOptions } from "discord.js";

interface SchemaDiscordConfig { name: string; token: string; options: ClientOptions; }
interface SchemaDatabaseCb { data: Array<T>, error: boolean, msg: string | null }

class Base {
    development: boolean;
    language: "tr-TR" | "en-US";
    log(message: string, platform: "default" | "discord" | "mysql" | "web", type: "log" | "warn" | "error"): any;
}

class Modules extends Base {
    embed(options: MessageEmbedOptions): MessageEmbed;
}

class Struct extends Base {
    discord(config: SchemaDiscordConfig): Client;
    mysql(config: PoolConfig): PoolConnection;
}

class Util extends Base {
    struct = new Struct();
    modules = new Modules();
}

export class Manager extends Util {
    public lang(key: string, values: Array, locate: "tr-TR"): string;

    private poolConnection: PoolConnection;
    database(query: Query): Promise<SchemaDatabaseCb>;
}