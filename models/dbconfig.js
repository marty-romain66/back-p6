const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://martyromaindev:Coline66..@cluster0.9tz5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


