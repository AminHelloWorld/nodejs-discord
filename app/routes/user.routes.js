const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();



  /*
   *  READ USERS (list)
   *
   * 
   */
  router.get(
    "/list",
    [authJwt.verifyToken, authJwt.verifyChannelRole],
    users.list
  );


  /*
   *  UPDATE USER 
   *
   * 
   */
  router.put(
    "/",
    [authJwt.verifyToken], //Verify user? ?
    users.update
  );


  /*
   *  DELETE USER (self)
   *
   * 
   */
  router.delete(
    "/",
    [authJwt.verifyToken],
    users.deleteSelf
  );

  /*
   *  DELETE USER (admin)
   *
   * 
   */
  router.delete(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.delete
  );


  app.use('/api/discord/user', router);
};
