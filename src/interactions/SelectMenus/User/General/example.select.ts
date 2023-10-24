import UserSelect from "../../../../Structures/Select/User.js";

export default new UserSelect({
  customId: "example",
  async run(client, interaction) {
    await interaction.reply("Hello!");
  },
});
