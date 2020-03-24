import { bot_cache, Bot_Options } from "../../mod.ts"
import { Channel_Types } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/channel.ts"
import { Permissions } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/permission.ts"
import MessageEmbed from "../util/embedConstructor.ts"

const elementary_roles = [
  { name: "Principles", color: "#800000" },
  { name: "Teachers", color: "#e6194B" },
  { name: "Parents", color: "#fabebe" },
  { name: "Students", color: "#9A6324" },
  { name: "Guests", color: "#f58231" },
  { name: "Pre-Kindergarden", color: "#ffd8b1" },
  { name: "Kindergarden", color: "#808000" },
  { name: "1st Grade", color: "#ffe119" },
  { name: "2nd Grade", color: "#fffac8" },
  { name: "3rd Grade", color: "#bfef45" },
  { name: "4th Grade", color: "#3cb44b" },
  { name: "5th Grade", color: "#aaffc3" },
  { name: "6th Grade", color: "#469990" },
  { name: "7th Grade", color: "#42d4f4" },
  { name: "8th Grade", color: "#000075" },
  { name: "9th Grade", color: "#4363d8" },
  { name: "10th Grade", color: "#911eb4" },
  { name: "11th Grade", color: "#e6beff" },
  { name: "12th Grade", color: "#f032e6" }
]

bot_cache.commands.set(`createelementary`, {
  guild_only: true,
  callback: async (message, _args, guild) => {
    // TODO: Create an embed that will update on the progress. We will edit this message.
    const embed = new MessageEmbed()
      .setAuthor(message.author().tag(), message.author().avatar_url())
      .setFooter("This message will update you on the progress. Please bear with me as I set up the entire server.")
      .setImage("https://tenor.com/view/loading-fast-gif-14829442")

    try {
      // Tell the user to wait while we make everything
      const response = await message.channel().send_message({ embed: embed })
      // Create all the roles needed for this server
      const [
        principle_role,
        teacher_role,
        parent_role,
        student_role,
        guest_role,
        prek_role,
        kindergarden_role,
        first_role,
        second_role,
        third_role,
        fourth_role,
        fifth_role,
        sixth_role,
        seventh_role,
        eight_role,
        ninth_role,
        tenth_role,
        eleventh_role,
        twelveth_role
      ] = await Promise.all(
        elementary_roles.map(data =>
          guild.create_role({ name: data.name, color: parseInt(data.color, 16), hoist: true })
        )
      )

      // Edit the embed
      embed.addField(
        `_roles Created`,
        `${principle_role} ${teacher_role} ${parent_role} ${student_role} ${guest_role} ${prek_role} ${kindergarden_role} ${first_role} ${second_role} ${third_role} ${fourth_role} ${fifth_role} ${sixth_role} ${seventh_role} ${eight_role} ${ninth_role} ${tenth_role} ${eleventh_role} ${twelveth_role}`
      )
      // Edit the message with the new field added showing the user we made the roles
      await response.edit({ embed: embed })

      const classes = [
        { name: "Pre-Kindergarden", role: prek_role },
        { name: "Kindergarden", role: kindergarden_role },
        { name: "1st Grade", role: first_role },
        { name: "2nd Grade", role: second_role },
        { name: "3rd Grade", role: third_role },
        { name: "4th Grade", role: fourth_role },
        { name: "5th Grade", role: fifth_role },
        { name: "6th Grade", role: sixth_role },
        { name: "7th Grade", role: seventh_role },
        { name: "8th Grade", role: eight_role },
        { name: "9th Grade", role: ninth_role },
        { name: "10th Grade", role: tenth_role },
        { name: "11th Grade", role: eleventh_role },
        { name: "12th Grade", role: twelveth_role }
      ]

      const channels = [
        {
          name: "important",
          permissionOverwrites: [
            { id: teacher_role.id, allow: [Permissions.SEND_MESSAGES] },
            { id: guild.id(), deny: [Permissions.VIEW_CHANNEL, Permissions.SEND_MESSAGES] }
          ],
          type: Channel_Types.GUILD_TEXT
        },
        {
          name: "homework-assignments",
          permissionOverwrites: [
            { id: teacher_role.id, allow: [Permissions.SEND_MESSAGES] },
            { id: guild.id(), deny: [Permissions.VIEW_CHANNEL, Permissions.SEND_MESSAGES] }
          ],
          type: Channel_Types.GUILD_TEXT
        },
        {
          name: "class-lessons",
          permissionOverwrites: [
            { id: teacher_role.id, allow: [Permissions.SEND_MESSAGES] },
            { id: guild.id(), deny: [Permissions.VIEW_CHANNEL, Permissions.SEND_MESSAGES] }
          ],
          type: Channel_Types.GUILD_TEXT
        },
        {
          name: "important-dates",
          permissionOverwrites: [
            { id: teacher_role.id, allow: [Permissions.SEND_MESSAGES] },
            { id: guild.id(), deny: [Permissions.VIEW_CHANNEL, Permissions.SEND_MESSAGES] }
          ],
          type: Channel_Types.GUILD_TEXT
        },
        { name: "main-chat", type: Channel_Types.GUILD_TEXT },
        { name: "study-together", type: Channel_Types.GUILD_TEXT },
        { name: "Class Meeting", type: Channel_Types.GUILD_VOICE }
      ]

      classes.forEach(async classData => {
        // Create the category for the class
        const category = await guild.create_channel(classData.name, {
          type: Channel_Types.GUILD_CATEGORY,
          permission_overwrites: [
            { id: guild.id(), deny: [Permissions.VIEW_CHANNEL], allow: [], type: "role" },
            { id: Bot_Options.bot_id, allow: [Permissions.VIEW_CHANNEL], deny: [], type: "member" },
            { id: classData.role.id(), allow: [Permissions.VIEW_CHANNEL], deny: [], type: "role" }
          ]
        })

        // channels.forEach(async channelData => {
        //   // Create the channel under the category to inherit its
        //   const channel = await guild.create_channel(channelData.name, { type: channelData.type, parent_id: category.id })

        //   // Add the id to the array
        //   if (channelData.permissionOverwrites && channelData.permissionOverwrites.length)
        //     await channel.edit({ permissionOverwrites: [...categoryPermissions, ...channelData.permissionOverwrites] })
        // })

        // // Edit the embed
        // embed.addField(
        //   `Created ${classData.name} Section`,
        //   `Category: ${category.name}\n${channelIDs.map(id => `<#${id}>`).join(" ")}`
        // )
        // // Send the new edited embed
        // await response.edit(embed)
      })
    } catch (error) {}
  }
})
