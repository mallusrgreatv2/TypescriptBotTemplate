import { UserSelectMenuInteraction } from "discord.js";
import Client from "../Client.js";

export default class UserSelect {
  readonly customId: string;
  readonly run: (client: Client, interaction: UserSelectMenuInteraction) => any;
  constructor(obj: {
    customId: string;
    readonly run: (
      client: Client,
      interaction: UserSelectMenuInteraction
    ) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
