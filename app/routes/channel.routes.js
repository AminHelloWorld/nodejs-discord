const { authJwt } = require("../middleware");

module.exports = app => {
    const channels = require("../controllers/channel.controller.js");
  
    var router = require("express").Router();
  
    // list all channels
    router.get("/list", channels.list);

    
    router.post(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.create);
    
    app.use('/api/discord/channel', router);
  };
  