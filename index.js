var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const articlesRoutes = require('./routes/article.js');
const commentairesRoutes = require('./routes/commentaire.js');
const categorieRoutes = require('./routes/categories.js');
const usersRoutes = require('./routes/users.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Routes
app.use('/article', articlesRoutes);
app.use('/commentaire', commentairesRoutes);
app.use('/categories', categorieRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(` api is running on port ${port}.`);
});