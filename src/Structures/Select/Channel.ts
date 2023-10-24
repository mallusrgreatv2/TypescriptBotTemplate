import { ChannelSelectMenuInteraction } from "discord.js";
import Client from "../Client.js";

export default class ChannelSelect {
  readonly customId: string;
  readonly run: (
    client: Client,
    interaction: ChannelSelectMenuInteraction
  ) => any;
  constructor(obj: {
    customId: string;
    readonly run: (
      client: Client,
      interaction: ChannelSelectMenuInteraction
    ) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
