const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")

client.config = require("./config.json")

client.on("ready", () => {
    console.log(client.user.tag + ` has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`)
    let server = client.voice.connections.size
    client.user.setActivity({ type: "PLAYING", name: `with the dragonborn`})
})

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
})
  
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
})

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    let member = newPresence.member
    if (member.id === '735721573410930699') {
        if (oldPresence.status !== newPresence.status) {
            const user = client.users.cache.get('366012212566818817')
            const botinfo = await client.users.fetch('735721573410930699')

            const online = {
                title: "🌻  " + botinfo.username + " is now back online!",
                description : 'Selamat anda bisa tidur sekarang :)',
                footer: { text: "Requested by " + botinfo.tag, 
                icon_url: (botinfo.avatarURL()) },
                timestamp: new Date()
            }
            const offline = {
                title: "🔪  " + botinfo.username + " is now offline!",
                description : 'Bot e matek anjer :v',
                footer: { text: "Requested by " + botinfo.tag, 
                icon_url: (botinfo.avatarURL()) },
                timestamp: new Date()
            }
            const connection = {
                title: "📶  " + botinfo.username + " had a connection problem!",
                description : 'Indihomo paling mabok lagi',
                footer: { text: "Requested by " + botinfo.tag, 
                icon_url: (botinfo.avatarURL()) },
                timestamp: new Date()
            }

            //console.log(newPresence.activities[0])

            if (newPresence.status === "offline") {
                user.send({ embed: offline })
            }
            else if (newPresence.activities[0] === undefined) {
                user.send({ embed: connection })
            }
            else if (newPresence.status === "online") {
                user.send({ embed: online })
            } 
            
        }
    }
})

client.login(config.token)

module.exports = client