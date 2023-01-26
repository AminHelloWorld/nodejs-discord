const { authJwt } = require("../middleware");

module.exports = app => {
    const channels = require("../controllers/channel.controller.js");
  
    var router = require("express").Router();
  
    // CREATE CHANNEL
    router.post(
      "/channel",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.create
    );
    
    // READ ALL CHANNELS (LIST)
    router.get(
      "/channel/list",
      [authJwt.verifyToken],
      channels.readAll
    );
    
    // TODO 
    //UPDATE CHANNEL

    router.put(
      "/channel",
      [authJwt.verifyToken, authJwt.isAdmin],
      channels.update
    );
    

    // TODO 
    //DELETE CHANNEL
    router.delete(
      "/channel",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.delete
    );
   
    
    app.use('/api/discord/channel', router);
  };
  