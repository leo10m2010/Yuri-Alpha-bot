const { canModifyQueue } = require("../util/YuriUtil");

module.exports = {
  name: "quitar",
  description: "Quitar la canción de la cola",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay ninguna cola.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Uso: ${message.client.prefix}quitar <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Uso: ${message.client.prefix}quitar <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ Sacado **${song[0].title}** de la cola.`);
  }
};
