import { GuildMember } from "discord.js";
import Event from "../../Structures/Event.js";

export default new Event({
  event: "interactionCreate",
  run: async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    // if (interaction.user.id !== "834827474155339797") return;
    const command = client.commands.find(
      (a) => a.data.name === interaction.commandName
    );
    if (!command) return;
    const member = interaction.guild?.members.cache.get(
      interaction.user.id
    ) as GuildMember;
    console.log(
      `${interaction.user.tag} used command ${interaction.commandName}`
    );
    try {
      await command.run(client, interaction, member);
    } catch (err) {
      console.error(err);
    }
  },
});
