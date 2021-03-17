require("dotenv").config();
const { testQueue1 } = require("../../queues");
module.exports = {
    getTest1: async (req, res) => {
        await testQueue1.add();
        res.send("res.send testQueue1 job added and finished");
    },
};
