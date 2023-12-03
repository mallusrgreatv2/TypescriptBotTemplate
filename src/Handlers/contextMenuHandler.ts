import Client from "@/Structures/Client.js";
import fs from "fs/promises";
import ContextMenu from "@/Structures/ContextMenu.js";
export default async function contextMenuHandler(client: Client) {
  const directories = await fs.readdir("./dist/interactions/ContextMenus");
  directories.forEach(async (directory: string) => {
    const files = await fs.readdir(
      `./dist/interactions/ContextMenus/${directory}/`
    );
    files.forEach((file: string) => {
      if (!file.endsWith(".menu.js")) return;
      import(`../interactions/ContextMenus/${directory}/${file}`)
        .then((imported) => imported.default)
        .then((imported: ContextMenu) => {
          client.contextMenus.set(imported.data.name, imported);
          client.logger.log({
            level: "info",
            message: "[CONTEXTMENU] Loaded app " + imported.data.name,
          });
        });
    });
  });
}
