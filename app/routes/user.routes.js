const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
    
    

    
  // TODO
  // READ USERS (list) ?
  
  // list messages on a channel
  router.get(
    "/user/list", 
    [authJwt.verifyToken, authJwt.isAdmin],
    users.list
  );


    // TODO
    // UPDATE USER
    
  router.put(
    "/user",
    [authJwt.verifyToken], //Verify user? ?
    users.update
  );

    
  // TODO 
  // DELETE USER
  router.delete(
    "/user",
    [authJwt.verifyToken], //verifyUserOrAdmin ????
    users.delete
  );  

    
  app.use('/api/discord/user', router);
  };
  