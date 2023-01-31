const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Message = db.messages;
const Channel = db.channels;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.userId;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};


verifyChannelRole = (req, res, next) => {
  Channel.findOne({
    where: {
      id: req.query.channelId
    }
  }).
    then(channel => {
      channel.getRoles({
        attributes: [`id`]
      }).then(channelRoles => {
        channelRoles = channelRoles.map((channelRoles) => channelRoles.id)
        User.findOne({
          where: {
            id: req.userId
          }
        }).then(user => {
          user.getRoles({
            attributes: [`id`]
          }).then(userRoles => {
            userRoles = userRoles.map((userRoles) => userRoles.id)
            let intersection = channelRoles.filter(id => userRoles.includes(id));
            if (intersection.length > 0) {
              next();
              return;
            }
            res.status(403).send({
              message: "You don't have the required role to do this !"
            });
          });
        });
      })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while    the channel."
      });
    });;
}

/* 
 *  Checks that the user sending the request is the same user that sent the specified message  
 *
 */
verifyMessageUser = (req, res, next) => {

  Message.findOne({
    where: {
      id: req.query.messageId
    }
  }).then(message => {
    if (message.userId != req.userId) {
      res.status(403).send({
        message: "You are not allowed to perform this action because you're not the sender of this message."
      });
    }
    next();
    return;
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while checking message sender identity."
      });
    });;
}


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  verifyChannelRole: verifyChannelRole,
  verifyMessageUser: verifyMessageUser
};
module.exports = authJwt;
