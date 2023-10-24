import Client from "../../Structures/Client.js";
import fs from "fs/promises";
import Select from "../../Structures/Select/Mentionable.js";
export default async function mentionableSelectHandler(client: Client) {
  const directories = await fs.readdir(
    "./dist/interactions/SelectMenus/Mentionable"
  );
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/SelectMenus/Mentionable/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".select.js")) return;
      import(`../../interactions/SelectMenus/Mentionable/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Select) => {
          client.selects.mentionable.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message:
              "[MODALS] Loaded mentionable select menu " + imported.customId,
          });
        });
    });
  });
}
