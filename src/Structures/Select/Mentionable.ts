import { MentionableSelectMenuInteraction } from "discord.js";
import Client from "../Client.js";

export default class MentionableSelect {
  readonly customId: string;
  readonly run: (
    client: Client,
    interaction: MentionableSelectMenuInteraction
  ) => any;
  constructor(obj: {
    customId: string;
    readonly run: (
      client: Client,
      interaction: MentionableSelectMenuInteraction
    ) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
