require("dotenv").config();
const config = require("config");
const express = require("express");
const Queue = require("bull");

const app = express();

const env = config.get("env");

const redis =
    env === "production" ? config.get("REDIS_URL") : { ...config.get("redis") };

const queue = new Queue("testQueue1", redis);

app.get("/test1", async (req, res) => {
    workerRes = await queue.add({ jobName: "test1.name" });
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(typeof workerRes);
    console.log("workerRes: ", workerRes);
    res.send(workerRes);
});

app.get("/", (req, res) => {
    console.log("(logged in console f12?) Home");
    res.send("Home");
});

const port = config.get("HEROKUPORT") || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
