const db = require("../models");
const Message = db.messages;
const sequelize = db.sequelize;

const User = db.users;


exports.list = (req, res) => {

  Message.findAll({
    offset: (req.query.page-1) * req.query.perPage,
    limit: parseInt(req.query.perPage),
    order: [
      ['createdAt', 'DESC']
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


exports.send = (req, res) => {
  
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {

    Message.create({
      text: req.body.text,
      originalText: req.body.text,
      userId: req.userId,
      username: user.username,
      channelId : req.query.channelId
    }).then(() => {
      res.send({ message: "Message sent successfully!" });
    })})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving message."
      });
    });;
}


exports.update = (req,res) => {
  if (req.body.text == null || req.body.text.trim().length == 0) {
    return res.status(400).send({
      message: "Please enter a valid update value."
    })
  }
  Message.update(
    { text: req.body.text,
      updatedAt: sequelize.fn('NOW')},
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


exports.delete = (req,res) => {
  Message.destroy({
    where: {
      id: req.query.messageId
    }
  })
  .then(()=>{
    res.send({ message: "Message deleted successfully!" })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting message."
    });
  });;
}