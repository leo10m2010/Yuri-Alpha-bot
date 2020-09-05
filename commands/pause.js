const { canModifyQueue } = require("../util/YuriUtil");

module.exports = {
  name: "pause",
  description: "Pausa la música que se está reproduciendo actualmente.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada que poner.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ detuvo la música.`).catch(console.error);
    }
  }
};
