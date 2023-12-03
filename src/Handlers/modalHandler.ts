import Client from "@/Structures/Client.js";
import fs from "fs/promises";
import Modal from "@/Structures/Modal.js";
export default async function modalHandler(client: Client) {
  const directories = await fs.readdir("./dist/interactions/Modals");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(`./dist/interactions/Modals/${directory}/`);
    files.forEach((file: string) => {
      if (!file.endsWith(".modal.js")) return;
      import(`../interactions/Modals/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: Modal) => {
          client.modals.set(imported.customId, imported);
          client.logger.log({
            level: "info",
            message: "[MODALS] Loaded modal " + imported.customId,
          });
        });
    });
  });
}
