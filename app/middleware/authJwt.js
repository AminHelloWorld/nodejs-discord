const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
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
    req.username = decoded.username;
    console.log(req.username);
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findOne({
    where: {
      username: req.username
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
      username: req.username
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
      username: req.username
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

verifyUser = (req, res, next) => {
    
  
}


verifyChannelRole = (req, res, next) => {
  Channel.findOne({
    where: {
      id : req.body.channelId
    }
  }).
  then(channel =>{
    channel.getRoles({
      attributes: [`id`]
    }).then(channelRoles=>{
      channelRoles = channelRoles.map((channelRoles) => channelRoles.id)
      User.findOne({
        where: {
          username: req.username
        }
      }).then(user => {
        user.getRoles({
          attributes: [`id`]
        }).then(userRoles => {
          userRoles = userRoles.map((userRoles) => userRoles.id)
          let intersection = channelRoles.filter(id => userRoles.includes(id));
          if (intersection.length>0){
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

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  verifyChannelRole: verifyChannelRole
};
module.exports = authJwt;
