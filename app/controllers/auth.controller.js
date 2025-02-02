const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // user role = 1
  Role.findOne({
    where: {
      name: "default_user",
      id: 2
    }
  })
    .then(defaultRole => {
      if (!defaultRole) {
        return res.status(404).send({ message: "Default role 'default_user' not found in DB." });
      }

      User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      })
        .then(user => {
          user.setRoles([2]).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}


  exports.login = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ userId: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.logout = (req, res) => {
    res.status(500).send({
      message:
        err.message || "Enpoint not implemented"
    });
  };