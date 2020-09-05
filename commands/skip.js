const { canModifyQueue } = require("../util/YuriUtil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Salta la canción que está sonando actualmente",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("No hay nada que pueda saltarme por ti.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ se saltó la canción`).catch(console.error);
  }
};
