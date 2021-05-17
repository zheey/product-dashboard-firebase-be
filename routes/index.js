"use strict";

const cors = require('cors')
const orders = require("../routes/orders");


module.exports = app => {
  // setup CORS
  app.options('*', cors())

  app.use((req, res, next) => {
    // Websites you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type, Authorization, token, Content-Type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  app.use((req, res, next) => {
    if (req.method.toLowerCase() === "options") {
      return res.status(204).send();
    }
    next();
  });
  app.use('/orders', orders)

};
