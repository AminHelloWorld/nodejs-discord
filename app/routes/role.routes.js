const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
  const roles = require("../controllers/role.controller.js");

  var router = require("express").Router();



  /*
   *    CREATE ROLE
   *
   * 
   */
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    roles.create
  );


  /*
   *    READ ROLES
   *
   * 
   */
  router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    roles.list
  );


  /*
   *    UPDATE ROLE
   *
   * 
   */
  router.put(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    roles.update
  );



  /*
   *    DELETE ROLE
   *
   * 
   */
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    roles.delete
  );



  app.use('/api/discord/role', router);

}