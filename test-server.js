require("dotenv").config();
const config = require("config");
const express = require("express");
const Queue = require("bull");

const app = express();
const queue = new Queue("testQueue1", config.get("REDIS_URL"));

app.get("/test1", async (req, res) => {
    await queue.add({ jobName: "test1.name" });
    res.send("job added to queue, await to send this response");
});

app.get("/", (req, res) => {
    res.send("Home");
});

const port = config.get("HEROKUPORT") || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
