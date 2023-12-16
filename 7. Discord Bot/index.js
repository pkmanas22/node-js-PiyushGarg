const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
    // console.log(message.content);
    // console.log(message);
    if (message.author.bot) return ;

    if (message.content.startsWith("create ")){
        // console.log(message.content);
        const url = message.content.split('create ')[1]
        return message.reply("Generating short URL for " + url)
    }

    message.reply("Hi, from Bot")
});

client.on("interactionCreate", (interaction) => {
    // console.log(interaction);
    interaction.reply("Pong")
})

client.login("MTE4NTM5OTYzMjk5NDUwMDY3OQ.G9GhQE.mF_w1q2Rs_Aio1DswmER7dvh024cJnXMSmP6pg");