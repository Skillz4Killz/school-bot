// This file is meant to show how you can create multiple commands in the same file if you wish.
import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts"
import { bot_cache } from "../../mod.ts"
import { cache } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/cache.ts"

const ping_command = (message: Message) => {
  return message.channel().send_message(`Ping MS: ${Date.now() - message.timestamp()}ms`)
}

const dev_ping_command = (message: Message) => {
  return message.channel().send_message(`Ping MS: ${Date.now() - message.timestamp()}ms | Guilds: ${cache.guilds.size} | Users: ${cache.users.size}`)
}

bot_cache.commands.set(`ping`, {
  callback: ping_command
})

bot_cache.commands.set(`devping`, {
  guild_only: true,
  callback: dev_ping_command
})

// Add multiple aliases
const devping_aliases = ['dping', 'ding']
devping_aliases.map(alias => bot_cache.command_aliases.set(alias, 'devping'))