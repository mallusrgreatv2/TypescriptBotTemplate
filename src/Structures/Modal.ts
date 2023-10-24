import { ModalSubmitInteraction } from "discord.js";
import Client from "./Client.js";

export default class Modal {
  readonly customId: string;
  readonly run: (client: Client, interaction: ModalSubmitInteraction) => any;
  constructor(obj: {
    customId: string;
    readonly run: (client: Client, interaction: ModalSubmitInteraction) => any;
  }) {
    this.customId = obj.customId;
    this.run = obj.run;
    return this;
  }
}
