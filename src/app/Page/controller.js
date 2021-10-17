const controller = {};
const sequelize = require('../../databases/index');
const { DataTypes } = require('sequelize');
const Page = require('../../databases/models/pages')(sequelize, DataTypes);
const Media = require('../../databases/models/media')(sequelize, DataTypes);
Page.belongsTo(Media, { foreignKey: 'badge'});

controller.all = async(req, res)=>{
    res.send(await Page.findAll({
        attributes:['titulo','badge'],
        include:[
            {
                model: Media
            }
        ]
    }))
}

controller.one = async(req, res)=>{
    res.send( await Page.findOne({
        where:{
            id: req.params.id
        },
        include:[
            {
                model: Media
            }
        ]
    }))
}

controller.post = async(req, res)=>{
    if(req.body.title && req.body.badge && req.body.content && req.body.published){
        var page = await Page.create({
            titulo: req.body.title,
            badge: req.body.badge,
            content: req.body.content,
            published: req.body.published
        });
        res.send(page)
    }else{
        res.status(401).send();
    }
}

module.exports = controller;