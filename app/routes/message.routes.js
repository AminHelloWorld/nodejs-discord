const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  
  // CREATE MESSAGE (send message)
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.verifyChannelRole],
    messages.send
  );

  // TODO
  // READ MESSAGES (list) ?
  
  // list messages on a channel
  router.get(
    "/list", 
    [authJwt.verifyToken, authJwt.verifyChannelRole],
    messages.list
  );

  // TODO
  // UPDATE MESSAGE

  router.put(
    "/",
    [authJwt.verifyToken], //, authJwt.verifyUser
    messages.update
  );


  // TODO 
  // DELETE MESSAGE
  router.delete(
    "/",
    [authJwt.verifyToken], // , authJwt.verifyUserOrAdmin
    messages.delete
  );

  

    app.use('/api/discord/message', router);
  };
  