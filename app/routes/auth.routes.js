const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // SIGNUP
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );


  // LOGIN
  app.post("/api/auth/login", controller.login);



  //TODO
  // LOGOUT
  app.get(
    "/api/auth/logout",
    [authJwt.verifyToken], 
    controller.logout
  );
};
