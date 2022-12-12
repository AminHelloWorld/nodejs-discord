module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // connect user(check if exists in db)
    router.post("/connect", users.connect);
  
    app.use('/api/discord/user', router);
  };
  