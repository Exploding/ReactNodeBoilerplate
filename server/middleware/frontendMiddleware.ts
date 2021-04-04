/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    const addProdMiddlewares = require("./addProdMiddleware");
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require("../../internals/webpack/webpack.dev.config");
    const addDevMiddlewares = require("./addDevMiddleware");
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
