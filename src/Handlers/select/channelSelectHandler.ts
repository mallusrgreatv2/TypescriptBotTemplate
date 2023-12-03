import Client from "@/Structures/Client.js";
import fs from "fs/promises";
import Select from "@/Structures/Select/Channel.js";
export default async function channelSelectHandler(client: Client) {
  const directories = await fs.readdir(
    "./dist/interactions/SelectMenus/Channel"
  );
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/SelectMenus/Channel/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".select.js")) return;
      import(`../../interactions/SelectMenus/Channel/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Select) => {
          client.selects.channel.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message: "[MODALS] Loaded channel select menu " + imported.customId,
          });
        });
    });
  });
}
