const db = require("../models");
const Channel = db.channels;
const Op = db.Sequelize.Op;

exports.list = (req, res) => {
  Channel.findAll().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving channel."
    });
  });;
}