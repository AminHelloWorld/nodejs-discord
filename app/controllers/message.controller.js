const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

async function getMsgCount(channelId){
  return await Message.count({
    where: {
      channelId: req.query.channelId 
    }});
}

exports.list = (req, res) => {

  Message.findAll({
    offset: (req.query.page-1) * req.query.perPage,
    limit: parseInt(req.query.perPage),
    order: [
      ['creationDate', 'DESC']
    ],
    where: {
      channelId: req.query.channelId 
    }
  }).then(data => {
    result = {
      pagination: {
        page: req.query.page,
        perPage: req.query.perPage,
      }, 
      data: data
    }
    Message.count({
      where: {
        channelId: req.query.channelId 
      }
    }).then(total => {
      result.pagination.total = total;
      res.send(result);
    })
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
    { text: req.body.text,
      updatedAt: Sequelize.NOW},
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