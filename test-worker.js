require("dotenv").config();
const config = require("config");
const Queue = require("bull");

const env = config.get("env");

const redis =
    env === "production" ? config.get("REDIS_URL") : { ...config.get("redis") };

console.log("starting worker...");
try {
    const queue = new Queue("testQueue1", redis);
    queue.process((job, done) => {
        setTimeout(() => {
            console.log("test1, result from worker");
        }, 5000);
        job.finished(done({ text: "test1, result1 from worker" }));
    });
} catch (error) {
    done(error);
}
