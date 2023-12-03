import Client from "@/Structures/Client.js";
import fs from "fs/promises";
import Select from "@/Structures/Select/User.js";
export default async function userSelectHandler(client: Client) {
  const directories = await fs.readdir("./dist/interactions/SelectMenus/User");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/SelectMenus/User/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".select.js")) return;
      import(`../../interactions/SelectMenus/User/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Select) => {
          client.selects.user.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message: "[MODALS] Loaded user select menu " + imported.customId,
          });
        });
    });
  });
}
