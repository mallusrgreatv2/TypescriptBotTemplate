import Client from "../Structures/Client.js";
import fs from "fs/promises";
import Command from "../Structures/Command.js";
export default async function commandHandler(client: Client) {
  const directories = await fs.readdir("./dist/Commands");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(`./dist/Commands/${directory}/`);
    files.forEach((file: string) => {
      if (!file.endsWith(".command.js")) return;
      import(`../Commands/${directory}/${file}`)
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
