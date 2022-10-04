const express = require("express");
const expressConfig = require("./config/express");
const databaseConfig = require("./config/dbConfig");
const routesConfig = require("./config/routes");
const PORT = process.env.PORT || 3000;

start();

async function start() {
  const app = express();
  expressConfig(app);
  await databaseConfig(app);
  routesConfig(app);

  app.listen(PORT, () =>
    console.log(`Server succsessfully started at port ${PORT}`)
  );
}
