/* eslint consistent-return:0 import/order:0 */
require("dotenv").config();
import express = require("express");
import morgan = require("morgan");
import logger from "./utils/logger";
import bodyParser = require("body-parser");

const startServer = async () => {
  const argv = require("./argv");
  const port = require("./port");
  const setup = require("./middleware/frontendMiddleware");
  const { resolve } = require("path");
  const app = express();
  const isDev = process.env.NODE_ENV !== "production";

  // set request body parsers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // set up http logging
  app.use(morgan(isDev ? "dev" : "common"));

  // connect routes
  require("./routes")(app);

  // In production we need to pass these values in instead of relying on webpack
  setup(app, {
    outputPath: resolve(process.cwd(), "build"),
    publicPath: "/",
  });

  // In production we need to pass these values in instead of relying on webpack
  setup(app, {
    outputPath: resolve(process.cwd(), "build"),
    publicPath: "/",
  });

  // use the gzipped bundle
  app.get("*.js", (req: any, res: any, next: any) => {
    req.url = req.url + ".gz"; // eslint-disable-line
    res.set("Content-Encoding", "gzip");
    next();
  });

  // get the intended host and port number, use localhost and port 3000 if not provided
  const customHost = argv.host || process.env.HOST;
  const host = customHost || null; // Let http.Server use its default IPv6/4 host

  // Start the app
  app
    .listen(port, host, () => {
      logger.info(`app started on port ${port}`);
    })
    .on("error", (err) => {
      logger.error(err);
    });
};

startServer();
