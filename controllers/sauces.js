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
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updateSauce = (req, res, next) => {
Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
  .then((result) => {
    res.status(200).json({message: "Sauce modifiée"});
  })
  .catch((error) => {
    res.status(400).json({error: error});
  })
}

exports.getSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
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