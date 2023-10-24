import Client from "../../Structures/Client.js";
import fs from "fs/promises";
import Select from "../../Structures/Select/String.js";
export default async function stringSelectHandler(client: Client) {
  const directories = await fs.readdir(
    "./dist/interactions/SelectMenus/String"
  );
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/SelectMenus/String/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".select.js")) return;
      import(`../interactions/SelectMenus/String/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Select) => {
          client.selects.string.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message: "[MODALS] Loaded string select menu " + imported.customId,
          });
        });
    });
  });
}
