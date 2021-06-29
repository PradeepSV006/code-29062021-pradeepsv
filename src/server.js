const express = require("express");
const app = express();
const routes = require("./routes/index");
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1MB' }))//setting up the limit to accept larger JSONs

const initialize = () => {
  routes.registerAllRoutes(app);
  app.listen(port, () => {
    console.log(`BMI Calculator API is available on port: ${port}`);
  });
};

const server = {
  initialize: initialize,
  app : app
};

module.exports = server;
