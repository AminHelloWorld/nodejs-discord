const db = require("../models");
const Role = db.roles;
const sequelize = db.sequelize;



exports.create = (req, res) => {

    Role.create({
        name : req.body.name
    })
    .then(() => {
        res.send({ message: "Role created successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating role."
        });
      });;
}

exports.list = (req, res) => {
    Role.findAll({
      offset: (req.query.page - 1) * req.query.perPage,
      limit: parseInt(req.query.perPage),
      order: [
        ['id', 'ASC']
      ]
    })
    .then(roles => {
      result = {
        pagination: {
          page: req.query.page,
          perPage: req.query.perPage,
        },
        data: roles
      }
      Role.count()
      .then(total => {
        result.pagination.total = total;
        res.send(result);
      })
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while listing role."
        });
      });;
    
}

exports.update = (req, res) => {
  Role.update(
    {
      name: req.body.name,
      updatedAt: sequelize.fn('NOW')
    },
    { where: { id: req.query.roleId } })
    .then(result => {
      if (result[0] == 0) {
        return res.status(400).send({
          message: "Role not found."
        })
      }
      res.send({message : "Role updated successfully."})
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating role."
      });
    });;
    
}

exports.delete = (req, res) => {
  Role.destroy({
    where: {
      id: req.query.roleId
    }
  })
    .then(result => {
      if (result[0] == 0) {
        return res.status(400).send({
          message: "Role not found."
        })
      }
      res.send({message : "Role deleted successfully."})
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting role."
      });
    });;
    
}