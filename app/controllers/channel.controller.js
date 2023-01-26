const db = require("../models");
const Channel = db.channels;
const Op = db.Sequelize.Op;
const Role = db.roles;


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


exports.update = (req,res) => {
  Channel.findOne({
    where: {
      channelId: req.body .channelId
    }
  })
    .then(channel =>
      channel.set({
        name: (req.body.name !== null) ? req.body.name : channel.name
      })
    );

}

exports.delete = () => {
  
exports.update = (req,res) => {
  res.status(500).send({
    message:
      err.message || "Enpoint not implemented"
  });
}
}

