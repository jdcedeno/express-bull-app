require("dotenv").config();
const config = require("config");

const Queue = require("bull");

try {
    const queue = new Queue("testQueue1", config.get("REDIS_URL"));
    queue.process((job, done) => {
        switch (job.data.jobName) {
            case "test1":
                done(null, "test1, result from worker");
                break;
            default:
                done(null, "default");
        }
    });
} catch (error) {
    console.log("caught worker error");
}
