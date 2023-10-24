import ChannelSelect from "../../../Structures/Select/Channel.js";

export default new ChannelSelect({
  customId: "example",
  async run(client, interaction) {
    await interaction.reply("Hello!");
  },
});
