import {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import Client from "@/Structures/Client.js";

export default class ContextMenu {
  readonly data: ContextMenuCommandBuilder;
  readonly run: (
    client: Client,
    interaction: ContextMenuCommandInteraction
  ) => any;
  constructor(obj: {
    data: ContextMenuCommandBuilder;
    run: (client: Client, interaction: ContextMenuCommandInteraction) => any;
  }) {
    this.data = obj.data;
    this.run = obj.run;
    return this;
  }
}
