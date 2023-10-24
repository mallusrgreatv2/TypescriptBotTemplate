import Client from "../../Structures/Client.js";
import fs from "fs/promises";
import Select from "../../Structures/Select/Role.js";
export default async function roleSelectHandler(client: Client) {
  const directories = await fs.readdir("./dist/interactions/SelectMenus/Role");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/SelectMenus/Role/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".select.js")) return;
      import(`../../interactions/SelectMenus/Role/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Select) => {
          client.selects.role.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message: "[MODALS] Loaded role select menu " + imported.customId,
          });
        });
    });
  });
}
