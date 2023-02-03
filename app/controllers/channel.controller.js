const db = require("../models");
const Channel = db.channels;
const Op = db.Sequelize.Op;
const Role = db.roles;
const User = db.users;
const sequelize = db.sequelize;
const Message = db.messages;


exports.create = (req, res) => {
  Channel.create({
    name: req.body.name,
    type: req.body.type
  })
    .then(channel => {
      if (!req.body.roles || req.body.roles.length==0) {
        return res.status(400).send({
          message: "Roles must be assigned to the channel for it to be created."
        })
      } else {
        Role.findAll({
          where: {
            id: {
              [Op.in]: req.body.roles
            }
          }
        }).then(roles => {
          if(roles.length!=req.body.roles.length){
            return res.status(400).send({
              message: "At least one of the roles that were assigned to the channel were not found."
            });
          }
          channel.setRoles(roles).then(() => {
            res.send({ message: "Channel created successfully." });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}


exports.list = (req, res) => {

  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {
    user.getRoles({
      attributes: ["id"]
    }).then(userRoles => {
      userRoles = userRoles.map((userRoles) => userRoles.id);
      Channel.findAll({
        offset: (req.query.page - 1) * req.query.perPage,
        limit: parseInt(req.query.perPage),
        order: [
          ['id', 'ASC']
        ],
        include: {
          model: Role,
          as: 'roles',
          attributes: [],
          where: {
            id: {
              [Op.in]: userRoles
            }
          },
          through: {
            attributes: []
          }
        }
      })
        .then(channels => {
          result = {
            pagination: {
              page: req.query.page,
              perPage: req.query.perPage,
            },
            data: channels
          }
          Channel.count({
            include: {
              model: Role,
              where: {
                id: {
                  [Op.in]: userRoles,
                }
              }
            }
          }).then(total => {
            result.pagination.total = total;
            res.send(result);
          })
        })
    });
  })

    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving channel."
      });
    });;
}


exports.update = (req, res) => {
  Channel.update(
    {
      name: (req.body.name !== null) ? req.body.name : channel.name,
      updatedAt: sequelize.fn('NOW')
    },
    { where: { id: req.query.channelId } }
  )
    .then(result => {
      if(result[0]==0){
        return res.status(400).send({
          message: "Channel not found."
        })
      }
      res.send({message : "Channel updated successfully"})
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating channel."
      });
    });;

}

exports.delete = (req, res) => {
  Message.destroy({
    where: {
      channelId: req.query.channelId
    }
  })
    .then(messages =>{
      Channel.destroy({
        where: {
          id: req.query.channelId
        }
      })
      .then(result => {
        if(result==0){
          return res.status(400).send({
            message: "Channel not found."
          })
        }
          res.send({message : "Channel deleted successfully"})
        })
   })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting channel."
      });
    });;
}




