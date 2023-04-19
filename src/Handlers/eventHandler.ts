import { ClientEvents } from "discord.js";
import fs from "fs/promises";
import Client from "../Structures/Client.js";
import Event from "../Structures/Event.js";
async function EventHandler(client: Client) {
  const dirs = await fs.readdir("./dist/Events");

  dirs.forEach(async (dir) => {
    const files = await fs.readdir(`./dist/Events/${dir}`);

    files.forEach(async (file: string) => {
      const eventFile: Event<keyof ClientEvents> = await import(
        `../Events/${dir}/${file}`
      ).then((imported) => imported.default);
      const { event } = eventFile;
      client.logger.log({
        level: "info",
        message: `[EVENTS] Loaded a file: ${file}`,
      });

      try {
        client.on(event, (...args: ClientEvents[typeof event]) =>
          eventFile.run(client, ...args)
        );
      } catch (err) {
        console.error(err);
      }
    });
  });
}

export default EventHandler;
