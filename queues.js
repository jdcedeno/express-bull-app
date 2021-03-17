const config = require("config");
const Queue = require("bull");
const { testWorker1 } = require("./workers");

const redis = config.get("redis");

let testQueue1;
if (process.env.NODE_ENV === "production") {
    console.log("creating workerbull in production");
    testQueue1 = new Queue("testQueue1", config.get("REDIS_URL"));
} else {
    console.log("creating workerbull in developemnt");
    testQueue1 = new Queue("testQueue1", { redis });
}

testQueue1.process((job, done) => testWorker1(job, done));

module.exports = {
    testQueue1,
};
