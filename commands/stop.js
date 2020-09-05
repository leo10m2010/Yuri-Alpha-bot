const { canModifyQueue } = require("../util/YuriUtil");


module.exports = {
  name: "stop",
  description: "Detiene la música",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("No hay nada que hacer.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ ¡paró la música!`).catch(console.error);
  }
};
