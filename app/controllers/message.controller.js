const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

exports.list = (req, res) => {

  Message.findAll({
    where: {
      channelId: req.query.channelId 
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

//todo test
exports.send = (req, res) => {
  console.log(req.body.text);
  console.log(req.username);
  console.log(req.body.channelId);
  Message.create({
    text: req.body.text,
    userId: 6,
    channelId : req.body.channelId
  }).then(() => {
    res.send({ message: "Message sent successfully!" });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving message."
    });
  });;
}

//todo
exports.update = (req,res) => {
  res.status(500).send({
    message:
      err.message || "Enpoint not implemented"
  });
}

//todo
exports.delete = (req,res) => {
  res.status(500).send({
    message:
      err.message || "Enpoint not implemented"
  });
}