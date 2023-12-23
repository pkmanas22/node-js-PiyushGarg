const cluster = require('node:cluster');
const express = require('express');
const os = require("os")

// const totalCPUs = os.availableParallelism();
const totalCPUs = os.cpus().length;
// console.log(totalCPUs);

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = 8000;

    app.get('/', async (req, res) => {
        return res.json({ message: `Hello from server with ${process.pid}` })
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
