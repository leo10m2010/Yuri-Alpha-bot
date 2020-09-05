const { canModifyQueue } = require("../util/YuriUtil");

module.exports = {
  name: "volumen",
  aliases: ["v"],
  description: "Cambiar el volumen de la música que se está reproduciendo actualmente",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("No hay nada que hacer.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("¡Tienes que unirte a un canal de voz primero!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 El volumen actual es: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Por favor, use un número para ajustar el volumen.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Por favor, use un número entre 0 y 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volumen ajustado a: **${args[0]}%**`).catch(console.error);
  }
};
