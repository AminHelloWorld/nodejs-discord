module.exports = app => {
    const channels = require("../controllers/channel.controller.js");
  
    var router = require("express").Router();
  
    // list all channels
    router.get("/list", channels.list);
  
    app.use('/api/discord/channel', router);
  };
  