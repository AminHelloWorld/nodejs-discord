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
    User.findOne({
      where: {
        id: decoded.userId
      }
    }).
      then(user =>{
        if (user == null) {
          return res.status(400).send({
            message: "User doesn't exist"
          });
        }
        req.userId = decoded.userId;
        next();
      })
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
        if (roles[i].id === 1) {
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

verifyChannelRole = (req, res, next) => {
  Channel.findOne({
    where: {
      id: req.query.channelId
    }
  }).
    then(channel => {
      if (channel == null) {
        return res.status(400).send({
          message: "Channel doesn't exist"
        });
      }
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
            if (intersection.length == 0) {
              return res.status(403).send({
                message: "You don't have the required role to do this !"
              });
            }
            next();
          });
        });
      })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
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
    if(message==null){
      return res.status(400).send({
        message: "Message doesn't exist."
      });
    }
    if (message.userId != req.userId) {
      return res.status(403).send({
        message: "You are not allowed to perform this action because you're not the sender of this message."
      });
    }
    next();
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while checking message sender identity."
      });
    });;
}

verifyMessageUserOrAdmin = (req, res, next) => {

  Message.findOne({
    where: {
      id: req.query.messageId
    }
  }).then(message => {
    if(message==null){
      return res.status(400).send({
        message: "Message doesn't exist."
      });
    }
    User.findOne({
      where: {
        id: req.userId
      }
    }).then(user => {
      user.getRoles({
        attributes: [`id`]
      }).then(userRoles => {
        userRoles = userRoles.map((userRoles) => userRoles.id);
        if (!userRoles.includes(1) && message.userId != req.userId) {
          return res.status(403).send({
            message: "You are not allowed to perform this action because you're not the sender of this message nor an admin."
          });
        }
        next();
      })
    })
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
  verifyChannelRole: verifyChannelRole,
  verifyMessageUser: verifyMessageUser,
  verifyMessageUserOrAdmin: verifyMessageUserOrAdmin
};
module.exports = authJwt;
