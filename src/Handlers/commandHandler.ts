import Client from "../Structures/Client.js";
import fs from "fs/promises";
import Command from "../Structures/Command.js";
export default async function commandHandler(client: Client) {
  const directories = await fs.readdir("./dist/interactions/SlashCommands");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/SlashCommands/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".command.js")) return;
      import(`../interactions/SlashCommands/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Command) => {
          client.commands.set(imported.data.name, imported);
          client.logger.log({
            level: "info",
            message: "[SLASH] Loaded command " + imported.data.name,
          });
        });
    });
  });
}
