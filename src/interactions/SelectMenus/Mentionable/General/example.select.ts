import MentionableSelect from "@/Structures/Select/Mentionable.js";

export default new MentionableSelect({
  customId: "example",
  async run(client, interaction) {
    await interaction.reply("Hello!");
  },
});
