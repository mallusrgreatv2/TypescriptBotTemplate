import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import Client from "./Client.js";

export default class Command {
  readonly data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | SlashCommandSubcommandsOnlyBuilder;
  readonly run: (
    client: Client,
    interaction: ChatInputCommandInteraction,
    member: GuildMember
  ) => Promise<void>;
  constructor(obj: {
    data:
      | SlashCommandBuilder
      | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
      | SlashCommandSubcommandsOnlyBuilder;
    run: (
      client: Client,
      interaction: ChatInputCommandInteraction,
      member: GuildMember
    ) => Promise<void>;
  }) {
    this.data = obj.data;
    this.run = obj.run;
    return this;
  }
}
