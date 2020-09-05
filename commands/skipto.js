const { canModifyQueue } = require("../util/YuriUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Saltar al número de cola seleccionado",
  execute(message, args) {
    if (!args.length)
      return message
        .reply(`Uso: ${message.client.prefix}${module.exports.name} <Número de cola>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`Uso: ${message.client.prefix}${module.exports.name} <Número de cola>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay cola.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(`La cola es sólo ${queue.songs.length} las canciones son largas!`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ se saltó ${args[0] - 1} canciones`).catch(console.error);
  }
};
