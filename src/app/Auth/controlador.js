const controlador = {};
const jwt = require("jsonwebtoken");
const sequelize = require("../../databases/index");
const { DataTypes } = require("sequelize");
const Usaurio = require("../../databases/models/users")(sequelize, DataTypes);

controlador.auth = async (req, res) => {
  if (req.body.email && req.body.pass) {
    var usaurio = await Usaurio.findOne({
      attributes: ['nombre','email','admin',],
      where:{
        email: req.body.email,
        pass: req.body.pass,
      }
    });

    if (usaurio != null) {
      const token = jwt.sign({ usuario: usuario }, process.env.CLAVE, {
        expiresIn: "3h",
      });
      usuario.setDataValue("token",token);
      res.send(token);
    }
  } else {
    res.status(403).send();
  }
};

controlador.register = async(req, res) => {
  var admin = req.headers["access-token"].usuario.admin;
  if(req.body.nombre && req.body.email && req.body.pass && admin){
    var usuario = await Usaurio.create({
      nombre: req.body.nombre,
      email: req.body.email,
      pass: req.body.pass,
      admin: false,
      active: true
    });

    usuario.setDataValue('token', jwt.sign({ usuario: usuario }, process.env.CLAVE, {
      expiresIn: "3h",
    }));

    res.send(usuario);
  }else{
    res.status(401).send();
  }
}

module.exports = controlador;
