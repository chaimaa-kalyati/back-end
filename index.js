const express = require('express');
const articleRoutes = require('./routes/articles.js');
const commantaireRoutes = require('./routes/commentaires.js');
const categorieRoutes = require('./routes/categories.js');
const userRoutes = require('./routes/users.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/article', articleRoutes);
app.use('/commantaire', commantaireRoutes);
app.use('/categorie', categorieRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {A
    console.log(` api is running on port ${port}.`);
});