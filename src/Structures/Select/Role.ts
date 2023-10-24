import { RoleSelectMenuInteraction } from "discord.js";
import Client from "../Client.js";

export default class RoleSelect {
  readonly customId: string;
  readonly run: (client: Client, interaction: RoleSelectMenuInteraction) => any;
  constructor(obj: {
    customId: string;
    readonly run: (
      client: Client,
      interaction: RoleSelectMenuInteraction
    ) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
