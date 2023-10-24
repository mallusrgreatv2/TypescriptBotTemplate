import {
  AutocompleteInteraction,
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
  ) => any;
  readonly autocomplete?: (
    client: Client,
    interaction: AutocompleteInteraction
  ) => any;
  constructor(obj: {
    data:
      | SlashCommandBuilder
      | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
      | SlashCommandSubcommandsOnlyBuilder;
    run: (
      client: Client,
      interaction: ChatInputCommandInteraction,
      member: GuildMember
    ) => any;
    autocomplete?: (
      client: Client,
      interaction: AutocompleteInteraction
    ) => any;
  }) {
    this.data = obj.data;
    this.run = obj.run;
    return this;
  }
}
