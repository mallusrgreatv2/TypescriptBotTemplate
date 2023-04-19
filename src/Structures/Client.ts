import {
  Client as BaseClient,
  Collection,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
import "dotenv/config";
import ClientConfig from "../Interfaces/ClientConfig";
import Command from "./Command.js";
import commandHandler from "../Handlers/commandHandler.js";
import eventHandler from "../Handlers/eventHandler.js";
import winston from "winston";
export default class Client extends BaseClient {
  readonly config: ClientConfig = process.env as unknown as ClientConfig;
  readonly commands: Collection<string, Command> = new Collection();
  readonly logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [new winston.transports.File({ filename: "logs.log" })],
  });
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ],
    });
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }
  async init() {
    commandHandler(this);
    eventHandler(this);
    await this.login(this.config.TOKEN);
  }
}
