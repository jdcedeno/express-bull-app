require("dotenv").config();
const config = require("config");
const express = require("express");
const testQueue1Routes = require("./components/testQueue1/routes");

const app = express();

testQueue1Routes(app);

const port = config.get("HEROKUPORT") || 4000;

require("./server")(app, port);
