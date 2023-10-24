import { StringSelectMenuInteraction } from "discord.js";
import Client from "../Client.js";

export default class StringSelect {
  readonly customId: string;
  readonly run: (
    client: Client,
    interaction: StringSelectMenuInteraction
  ) => any;
  constructor(obj: {
    customId: string;
    readonly run: (
      client: Client,
      interaction: StringSelectMenuInteraction
    ) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
