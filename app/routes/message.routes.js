module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  
    // list messages on a channel
    router.get("/list", messages.list);
  
    app.use('/api/discord/message', router);
  };
  