const express = require("express");
const router = express.Router();
const { getTest1 } = require("./controller");

router.get("/getTest1", getTest1);

module.exports = (app) => {
    app.use("/testQueue1", router);
};
