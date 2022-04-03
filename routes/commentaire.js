const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


router.get('/', async (req, res) => {
    const result = await prisma.commentaire.findMany()
    res.json(result)
})



router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { contenu } = req.body
    const result = await prisma.commentaire.update({
      where: { id: Number(id) },
      data: { 
        contenu: contenu,
       },
    })
    res.json(result)
})

router.post(`/`, async (req, res) => {
    
    const result = await prisma.commentaire.create({
        data: req.body,
    })
    res.json(result)
})

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.commentaire.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(result)
})


module.exports = router;

