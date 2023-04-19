/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Event from "../../Structures/Event.js";
export default new Event({
  event: "ready",
  run: async (client) => {
    client.logger.log({
      level: "info",
      message: `Bot logged in as ${client.user?.tag}`,
    });
    const commands = client.commands.map((command) => command.data.toJSON());
    await client.guilds.cache
      .get(client.config.GUILD_ID.toString())
      ?.commands.set(commands);
  },
});
