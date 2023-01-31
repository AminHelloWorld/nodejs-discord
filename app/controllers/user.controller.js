const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;



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