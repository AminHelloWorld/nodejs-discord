const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

exports.list = (req, res) => {

  Message.findAll({
    where: {
      channelId: req.query.id 
    }
  }).then(data => {
      res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving message."
    });
  });;
}