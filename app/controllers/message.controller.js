const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;


//TODO PAGINATION
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
  Message.create({
    text: req.body.text,
    originalText: req.body.text,
    userId: 6,
    channelId : req.query.channelId
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
  Message.update(
    { text: req.body.text },
  { where: { id: req.query.messageId } }
  ).then(() => {
    res.send({ message: "Message updated successfully!" });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating message."
    });
  });;
}

//todo
exports.delete = (req,res) => {
  res.status(500).send({
    message:
      err.message || "Enpoint not implemented"
  });
}