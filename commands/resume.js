const { canModifyQueue } = require("../util/YuriUtil");

module.exports = {
  name: "reanudar",
  aliases: ["r"],
  description: "Reanudar actualmente la reproducción de música",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada que hacer.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ ¡Reanudó la música!`).catch(console.error);
    }

    return message.reply("La cola no está en pausa.").catch(console.error);
  }
};
