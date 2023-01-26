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


//TODO?
exports.list = (req, res) => {
  User.findAll()
  .then(data => {
      res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });;

}


//TODO
exports.update = (req, res) => {
  
  res.status(500).send({
    message:
      err.message || "Enpoint not implemented"
  });
}


//TODO
exports.delete = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Enpoint not implemented"
  });
}