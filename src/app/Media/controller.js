const controlador = {};
const sequelize = require("../../databases/index");
const { DataTypes } = require("sequelize");
const Media = require("../../databases/models/media")(sequelize, DataTypes);

const path = require("path");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const storageImages = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images"),
  filename: (req, file, cb) => {
    var name = encriptfile(file.originalname);
    cb(null, name);
  },
  limits:{
    fileSize: 1073741824
  }
});

const uploadImages = multer({
  storage: storageImages,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("image");

const storageVideos = multer.diskStorage({
  destination: path.join(__dirname, "../../public/videos"),
  filename: (req, file, cb) => {
    var name = encriptfile(file.originalname);
    cb(null, name);
  },
  limits: { fileSize: 16106127360}
});

const uploadVideo = multer({
    storage: storageVideos,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== ".mp3") {
        return callback(new Error("Only images are allowed"));
      }
      callback(null, true);
    },
  }).single("audio");

const uploadVideos = multer({
  storage: storageVideos,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".mkv") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("video");

const storageAudio = multer.diskStorage({
  destination: path.join(__dirname, "../../public/audios"),
  filename: (req, file, cb) => {
    var name = encriptfile(file.originalname);
    cb(null, name);
  },
});

const storageFile = multer.diskStorage({
  destination: path.join(__dirname, "../../public/videos"),
});

const uploadFile = multer({
  storage: storageFile,
}).single("file");

function encriptfile(filename) {
  return (
    crypto.createHash("sha1").update(filename).digest("hex") +
    "." +
    filename.split(".")[1]
  );
}

controlador.imagen = async (req, res) => {
  uploadImages(req, res, async (err) => {
    if (err) {
      console.log(err);
    }

    var media = await Media.create({
      name: req.file.filename,
      type: "image",
      url: `http://localhost:3000/static/images/${req.file.filename}`,
    });

    res.send(media);
  });
};

controlador.getImages = async(req, res)=>{
  res.send(await Media.findAll({
    where:{
      type: 'image'
    }
  }));
}

controlador.video = async (req, res) => {
  uploadVideo(req, res, async (err) => {
    if (err) {
      console.log(err);
    }

    var media = await Media.create({
      name: req.file.filename,
      type: "videos",
      url: `http://localhost:3000/static/videos/${req.file.filename}`,
    });

    res.send(media);
  });
};

controlador.getVideo = async(req, res)=>{
  res.send(await Media.findAll({
    where:{
      type: 'videos'
    }
  }));
}

controlador.audio = async (req, res) => {
  uploadAudio(req, res, async (err) => {
    if (err) {
      console.log(err);
    }

    var media = await Media.create({
      name: req.file.filename,
      type: "audio",
      url: `http://localhost:3000/static/audios/${req.file.filename}`,
    });

    res.send(media);
  });
};

controlador.getAudio = async(req, res)=>{
  res.send(await Media.findAll({
    where:{
      type: 'audio'
    }
  }));
}

controlador.file = async (req, res) => {
  uploadFile(req, res, async (err) => {
    if (err) {
      console.log(err);
    }

    var media = await Media.create({
      name: req.file.filename,
      type: "file",
      url: `http://localhost:3000/static/files/${req.file.filename}`,
    });

    res.send(media);
  });
};

controlador.getFile = async(req, res)=>{
  res.send(await Media.findAll({
    where:{
      type: 'file'
    }
  }));
}

module.exports = controlador;
