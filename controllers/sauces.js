const fs = require('fs');

//Import du modele de la sauce
const Sauce = require("../models/Sauce");


exports.createSauce = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then((sauce) => {
      res.status(201).json({ sauce });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id   })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(401).json({ message : "Sauce inconnue" }));
};


exports.updateSauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? (
    console.log(req.file),
    console.log("il y a une image"),

    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
  
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
   
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  ) : ( 
    sauceObject = {
      ...req.body
    }
  )
  Sauce.updateOne(
     
      {
        _id: req.params.id
      }, {
        ...sauceObject,
        _id: req.params.id
      }
    )
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

exports.getSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
}

exports.allSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};




exports.like = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const dislike = req.body.dislike;
  if (like === 1) {
    Sauce.updateOne({
      _id: sauceId 
    },{
      $push:  { 
        usersLiked: userId 
      },
     $inc: { 
       likes: +1 
    } ,
  
})
.then(() => res.status(200).json({
  message: 'j\'aime ajouté !'
}))
.catch((error) => res.status(400).json({
  error
}))
}

if (like === -1){
  Sauce.updateOne({
    _id: sauceId
  },{
    $push : {
      usersDisliked : userId
    },
    $inc: {
      dislikes : +1
    },
  })
  .then(() => res.status(200).json("message dislike ajouter!"))
  .catch ((error) => res.status(400).json(error))
}
if (like === 0) {
  Sauce.findOne({
      _id: sauceId
    })
    .then((sauce) => {
      if (sauce.usersLiked.includes(userId)) {
        Sauce.updateOne({
            _id: sauceId
          }, {
            $pull: {
              usersLiked: userId
            },
            $inc: {
              likes: -1
            }, 
          })
          .then(() => res.status(200).json({
            message: 'Like retiré !'
          }))
          .catch((error) => res.status(400).json({
            error
          }))
      }
      if (sauce.usersDisliked.includes(userId)) { 
        Sauce.updateOne({
            _id: sauceId
          }, {
            $pull: {
              usersDisliked: userId
            },
            $inc: {
              dislikes: -1
            }, 
          })
          .then(() => res.status(200).json({
            message: 'Dislike retiré !'
          }))
          .catch((error) => res.status(400).json({
            error
          }))
      }
    })
    .catch((error) => res.status(404).json({
      error
    }))


  }}
  










