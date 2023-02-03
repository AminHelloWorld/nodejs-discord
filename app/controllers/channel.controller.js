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
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          channel.setRoles(roles).then(() => {
            res.send({ message: "channel created successfully! (specific roles)" });
          });
        });
      } else {
        // user role = 1
        channel.setRoles([1]).then(() => {
          res.send({ message: "channel created successfully! (user role)" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}


exports.readAll = (req, res) => {

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
    .then(() => {
      res.send("Channel updated successfully")
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
    .then(() =>{
      Channel.destroy({
        where: {
          id: req.query.channelId
        }
      })
        .then(() => {
          res.send("Channel deleted successfully")
        })
   })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting channel."
      });
    });;
}




