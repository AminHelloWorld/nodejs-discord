const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.connect = (req, res) => {

  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message : "You need to provide a username and a password"
    });
  }
  User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(data => {
    if(data.length==1){
      res.send(data);
    }
    else{
      throw -1;
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user."
    });
  });;
}