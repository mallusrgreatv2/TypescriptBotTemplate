import {
  Client as BaseClient,
  Collection,
  GatewayIntentBits,
} from "discord.js";
import winston from "winston";
import mongoose from "mongoose";
import "dotenv/config";

import ClientConfig from "../Interfaces/ClientConfig";
import initHandlers from "../Handlers";

import Command from "./Command.js";
import Modal from "./Modal.js";
import Button from "./Button.js";
import StringSelect from "./Select/String.js";
import ChannelSelect from "./Select/Channel.js";
import RoleSelect from "./Select/Role.js";
import UserSelect from "./Select/User.js";
import MentionableSelect from "./Select/Mentionable.js";
import ContextMenu from "./ContextMenu.js";

export default class Client extends BaseClient {
  readonly config: ClientConfig = process.env as unknown as ClientConfig;
  readonly commands: Collection<string, Command> = new Collection();
  readonly modals: Collection<string, Modal> = new Collection();
  readonly selects = {
    string: new Collection() as Collection<string, StringSelect>,
    channel: new Collection() as Collection<string, ChannelSelect>,
    role: new Collection() as Collection<string, RoleSelect>,
    user: new Collection() as Collection<string, UserSelect>,
    mentionable: new Collection() as Collection<string, MentionableSelect>,
  };
  readonly contextMenus: Collection<string, ContextMenu> = new Collection();
  readonly buttons: Collection<string, Button> = new Collection();
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
    initHandlers(this);
    if (this.config.MONGODB_ENABLED === "true") await this.mongoDBconnect();
    await this.login(this.config.TOKEN);
  }
  async mongoDBconnect() {
    try {
      await mongoose.connect(this.config.MONGODB_CONNECTION_STRING);
    } catch (err) {
      this.logger.error(
        "An error occured while connecting to MongoDB database:"
      );
      this.logger.error(err);
      console.error(err);
      return;
    }
    this.logger.info("Connected to MongoDB database.");
  }
}
