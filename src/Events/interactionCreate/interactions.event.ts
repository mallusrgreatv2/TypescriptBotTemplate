import { GuildMember } from "discord.js";
import Event from "@/Structures/Event.js";

export default new Event({
  event: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.find(
        (a) => a.data.name === interaction.commandName
      );
      if (!command) return;
      const member = interaction.guild?.members.cache.get(
        interaction.user.id
      ) as GuildMember;
      console.log(
        `${interaction.user.tag} used command ${interaction.commandName}`
      );
      try {
        await command.run(client, interaction, member);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isAutocomplete()) {
      const command = client.commands.find(
        (a) => a.data.name === interaction.commandName
      );
      if (!command) return;
      if (command.autocomplete) await command.autocomplete(client, interaction);
    } else if (interaction.isModalSubmit()) {
      const modal = client.modals.find(
        (a) => a.customId === interaction.customId
      );
      if (!modal) return;
      console.log(
        `${interaction.user.tag} opened modal ${interaction.customId}`
      );
      try {
        await modal.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isButton()) {
      const button = client.buttons.find(
        (a) => a.customId === interaction.customId
      );
      if (!button) return;
      console.log(
        `${interaction.user.tag} clicked button ${interaction.customId}`
      );
      try {
        await button.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isStringSelectMenu()) {
      const select = client.selects.string.find(
        (a) => a.customId === interaction.customId
      );
      if (!select) return;
      console.log(
        `${interaction.user.tag} selected string select menu ${interaction.customId}`
      );
      try {
        await select.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isRoleSelectMenu()) {
      const select = client.selects.role.find(
        (a) => a.customId === interaction.customId
      );
      if (!select) return;
      console.log(
        `${interaction.user.tag} selected role select menu ${interaction.customId}`
      );
      try {
        await select.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isChannelSelectMenu()) {
      const select = client.selects.channel.find(
        (a) => a.customId === interaction.customId
      );
      if (!select) return;
      console.log(
        `${interaction.user.tag} selected channel select menu ${interaction.customId}`
      );
      try {
        await select.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isMentionableSelectMenu()) {
      const select = client.selects.mentionable.find(
        (a) => a.customId === interaction.customId
      );
      if (!select) return;
      console.log(
        `${interaction.user.tag} selected mentionable select menu ${interaction.customId}`
      );
      try {
        await select.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isUserSelectMenu()) {
      const select = client.selects.user.find(
        (a) => a.customId === interaction.customId
      );
      if (!select) return;
      console.log(
        `${interaction.user.tag} selected user select menu ${interaction.customId}`
      );
      try {
        await select.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    } else if (interaction.isContextMenuCommand()) {
      const select = client.contextMenus.find(
        (a) => a.data.name === interaction.commandName
      );
      if (!select) return;
      console.log(
        `${interaction.user.tag} executed context menu command ${interaction.commandName}`
      );
      try {
        await select.run(client, interaction);
      } catch (err) {
        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.followUp("An error has occured.");
          } catch (err) {}
        } else {
          try {
            await interaction.reply("An error has occured.");
          } catch (err) {}
        }
        console.error(err);
      }
    }
  },
});
