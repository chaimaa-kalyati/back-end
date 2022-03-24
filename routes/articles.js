var express = require('express');
var router = express.Router();
const articlesRepo = require('../respositories/articles');


router.get('/', async function(req, res, next) {
  const limit = parseInt(req.query.limit) || 10;
  res.send(await  articlesRepo.getArticles(limit))
});


router.delete('/:id',async function(req,res,next){
    const id = req.params.id
    res.send(await articlesRepo.deleteArticle(id))
})

router.put('/',async function(req,res,next){
    const article = req.body
    res.send(await articlesRepo.updateArticle(article))
})

router.post('/',async function(req,res,next){
    const article = req.body
    res.send(await articlesRepo.addArticle(article))
})

router.get('/:id', async function(req, res, next) {
    res.send(await articlesRepo.getArticle(req.params.id))
})


module.exports = router;
