const db = require("../models");
const Channel = db.channels;
const Op = db.Sequelize.Op;
const Role = db.roles;

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


exports.create = (req, res) => {
  console.log(req.body.roles);
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
          res.send({ message: "channel created successfully!" });
        });
      });
    } else {
      // user role = 1
      channel.setRoles([1]).then(() => {
        res.send({ message: "User registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}