var express = require('express');
var router = express.Router();
const tagsRepo = require('../respositories/categories');


router.get('/', async function(req, res, next) {
  res.send(await  categoriesRepo.getAllTag())
});

router.delete('/:id',async function(req,res,next){ 
    const id = req.params.id
    res.send(await categoriesRepo.deletecategorie(id))
})

router.put('/',async function(req,res,next){
    const tag = req.body
    res.send(await categoriesRepo.updatecategorie(categorie))
})

router.post('/',async function(req,res,next){
    const tag = req.body
  res.send(await categoriesRepo.addcategorie(categorie))
})

router.get('/:id', async function(req, res, next) {
    res.send(await categoriesRepo.getcategorie(req.params.id))
})

module.exports = router;