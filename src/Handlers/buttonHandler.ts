import Client from "@/Structures/Client.js";
import fs from "fs/promises";
import Button from "@/Structures/Button.js";
export default async function buttonHandler(client: Client) {
  const directories = await fs.readdir("./dist/interactions/Buttons");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(`./dist/interactions/Buttons/${directory}/`);
    files.forEach((file: string) => {
      if (!file.endsWith(".button.js")) return;
      import(`../interactions/Buttons/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Button) => {
          client.buttons.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message: "[BUTTONS] Loaded button " + imported.customId,
          });
        });
    });
  });
}
