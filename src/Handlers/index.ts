import Client from "../Structures/Client.js";
import buttonHandler from "./buttonHandler.js";
import commandHandler from "./commandHandler.js";
import contextMenuHandler from "./contextMenuHandler.js";
import eventHandler from "./eventHandler.js";
import modalHandler from "./modalHandler.js";
import channelSelectHandler from "./select/channelSelectHandler.js";
import mentionableSelectHandler from "./select/mentionableSelectHandler.js";
import roleSelectHandler from "./select/roleSelectHandler.js";
import stringSelectHandler from "./select/stringSelectHandler.js";
import userSelectHandler from "./select/userSelectHandler.js";
export default function initHandlers(client: Client) {
  passClient(
    client,
    buttonHandler,
    commandHandler,
    eventHandler,
    modalHandler,
    stringSelectHandler,
    channelSelectHandler,
    roleSelectHandler,
    mentionableSelectHandler,
    userSelectHandler,
    contextMenuHandler
  );
}
function passClient(client: Client, ...funcs: Function[]) {
  funcs.forEach((func) => {
    func(client);
  });
}
