import {
  Client as BaseClient,
  Collection,
  DiscordjsError,
  DiscordjsErrorCodes,
  GatewayIntentBits,
} from "discord.js";
import winston from "winston";
import mongoose from "mongoose";
import "dotenv/config";

import ClientConfig from "@/Interfaces/ClientConfig.js";
import initHandlers from "@/Handlers/index.js";

import Command from "@/Structures/Command.js";
import Modal from "@/Structures/Modal.js";
import Button from "@/Structures/Button.js";
import StringSelect from "@/Structures/Select/String.js";
import ChannelSelect from "@/Structures/Select/Channel.js";
import RoleSelect from "@/Structures/Select/Role.js";
import UserSelect from "@/Structures/Select/User.js";
import MentionableSelect from "@/Structures/Select/Mentionable.js";
import ContextMenu from "@/Structures/ContextMenu.js";

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
    transports: [new winston.transports.File({ filename: "logs.log" })],
  });
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
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
    try {
      await this.login(this.config.TOKEN);
    } catch (err) {
      let error = err as unknown as DiscordjsError;
      if (
        [
          DiscordjsErrorCodes.TokenInvalid,
          DiscordjsErrorCodes.TokenMissing,
        ].includes(error.code)
      ) {
        this.logger.error(
          "Please create a .env file, copy the contents of .env.example to the .env file, and then fill out the token properly."
        );
        this.logger.error(
          "If you already filled it out, the token is invalid!"
        );

        return;
      } else if (
        [
          DiscordjsErrorCodes.InvalidIntents,
          DiscordjsErrorCodes.ClientMissingIntents,
          DiscordjsErrorCodes.DisallowedIntents,
        ].includes(error.code)
      ) {
        this.logger.error(
          "It seems you have enabled intents that are disabled in the developer portal. Either remove them from src/Structures/Client.ts:45:16 or enable them from the developer portal."
        );
        this.logger.error(
          "If you already filled it out, the token is invalid!"
        );
        return;
      }
      this.logger.error(error);
      console.log(error);
    }
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
