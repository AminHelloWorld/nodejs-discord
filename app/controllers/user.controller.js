const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const Channel = db.channels;
const Role = db.roles;
const Message = db.messages;
const sequelize = db.sequelize;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");


exports.list = (req, res) => {
  Channel.findOne({
    where: {
      id: req.query.channelId
    }
  }).then(channel => {
    if (channel == null) {
      return res.status(400).send({
        message: "Channel doesn't exist"
      });
    }
    channel.getRoles({
      attributes: ["id"]
    }).then(channelRoles => {
      channelRoles = channelRoles.map((channelRoles) => channelRoles.id);
      User.findAll({
        offset: (req.query.page - 1) * req.query.perPage,
        limit: parseInt(req.query.perPage),
        order: [
          ['id', 'ASC']
        ],
        attributes: { exclude: ['password'] },
        include: {
          model: Role,
          as: 'roles',
          attributes: [],
          where: {
            id: {
              [Op.in]: channelRoles
            }
          },
          through: {
            attributes: []
          }
        }
      })
        .then(users => {
          result = {
            pagination: {
              page: req.query.page,
              perPage: req.query.perPage,
            },
            data: users
          }
          User.count({
            include: {
              model: Role,
              where: {
                id: {
                  [Op.in]: channelRoles,
                }
              }
            }
          }).then(total => {
            result.pagination.total = total;
            res.send(result);
          })
        })
    })
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });;

}


exports.update = (req, res) => {
  if (req.body.name == null || req.body.name.trim().length == 0) {
    return res.status(400).send({
      message: "Please enter a valid update value."
    })
  }
  User.update(
    {
      username: req.body.name,
      updatedAt: sequelize.fn('NOW')
    },
    { where: { id: req.userId } })
    .then(result => {
      console.log(result);
      if (result[0] == 0) {
        return res.status(400).send({
          message: "User not found."
        })
      }
      res.send({ message: "User updated successfully" })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating user."
      });
    });;
}


exports.deleteSelf = (req, res) => {
  Message.destroy({
    where: {
      userId: req.userId
    }
  })
    .then(() =>{
      User.destroy({
        where: {
          id: req.userId
        }
      })
      .then(result => {
        if(result==0){
          return res.status(400).send({
            message: "User not found."
          })
        }
        jwt.sign({ userId: req.userId }, config.secret, {
          expiresIn: 10 // 24 hours
        });
        res.send({message : "User deleted successfully"})
        })
   })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting user."
      });
    });;

}


exports.delete = (req, res) => {
  Message.destroy({
    where: {
      userId: req.query.userId
    }
  })
    .then(() =>{
      User.destroy({
        where: {
          id: req.query.userId
        }
      })
      .then(result => {
        if(result==0){
          return res.status(400).send({
            message: "User not found."
          })
        }
        jwt.sign({ userId: req.query.userId }, config.secret, {
          expiresIn: 10 // 24 hours
        });
          res.send({message : "User deleted successfully"})
        })
   })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting user."
      });
    });;

}