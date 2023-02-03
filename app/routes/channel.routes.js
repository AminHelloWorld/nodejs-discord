const { authJwt } = require("../middleware");

module.exports = app => {
    const channels = require("../controllers/channel.controller.js");
  
    var router = require("express").Router();
  
    // CREATE CHANNEL
    router.post(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.create
    );
    
    // READ ALL CHANNELS (LIST)
    router.get(
      "/list",
      [authJwt.verifyToken],
      channels.readAll
    );
    

    //UPDATE CHANNEL
    router.put(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin],
      channels.update
    );
    

    //DELETE CHANNEL
    router.delete(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.delete
    );
   
    
    app.use('/api/discord/channel', router);
  };
  