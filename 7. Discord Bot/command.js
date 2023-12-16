const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'create',
        description: 'Create a new short URL',
    },
];

const rest = new REST({ version: '10' }).setToken("MTE4NTM5OTYzMjk5NDUwMDY3OQ.G9GhQE.mF_w1q2Rs_Aio1DswmER7dvh024cJnXMSmP6pg");

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(Routes.applicationCommands("1185399632994500679"), { body: commands });
    
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})()