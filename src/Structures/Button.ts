import { AnySelectMenuInteraction, ButtonInteraction } from "discord.js";
import Client from "./Client.js";

export default class Button {
  readonly customId: string;
  readonly run: (client: Client, interaction: ButtonInteraction) => any;
  constructor(obj: {
    customId: string;
    readonly run: (client: Client, interaction: ButtonInteraction) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
