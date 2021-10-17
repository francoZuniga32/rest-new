const controller = {};

const jwt = require('jsonwebtoken')
const sequelize = require('../../databases/index');
const { DataTypes } = require('sequelize');
const Post = require('../../databases/models/posts')(sequelize, DataTypes);
const User = require('../../databases/models/users')(sequelize, DataTypes);
const Media = require('../../databases/models/media')(sequelize, DataTypes);

Post.belongsTo(User);
Post.belongsTo(Media, { foreignKey: "badge"});

controller.all = async(req, res)=>{
    res.send(await Post.findAll({
        include:[
            {
                model: User,
            },
            {
                model: Media
            }
        ]
    }))
}

controller.create = async(req, res)=>{
    var usuario = jwt.verify(req.headers["access-token"], process.env.CLAVE).usuario;
    console.log(req.body.title , req.body.content ,usuario , req.body.published)
    if(req.body.title && req.body.content && usuario && req.body.published){
        var post = Post.create({
            title: req.body.title,
            badge: req.body.badge,
            content: req.body.content,
            UserId: usuario.id,
            published: req.body.published
        });

        res.send(post);
    }else{
        res.status(401).send();
    }
}

controller.one = async(req, res)=>{
    res.send(await Post.findOne({
        where:{
            id: req.params.id
        }
    }));
}

module.exports = controller;