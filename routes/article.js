const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const result = await prisma.article.findMany({
        where: { published: true },
    })
    res.json(result)
})

router.get('/not-published', async (req, res) => {
    const result = await prisma.article.findMany({
        where: { published: false },
    })
    res.json(result)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await prisma.article.findUnique({
        where: {
            id: Number(id),
        },
    })
    res.json(result)
})

router.post(`/`, async (req, res) => {
    const { titre, contenu, image, authorEmail}  = req.body
    const result = await prisma.article.create({
      data: {
        titre: titre,
        contenu: contenu,
        image: image,
        author: { connect: { email: authorEmail } },
      },
    })
    res.json(result)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { titre, contenu, image} = req.body
    const result = await prisma.article.update({
      where: { id: Number(id) },
      data: { 
        titre: titre,
        contenu: contenu,
        image: image,
       },
    })
    res.json(result)
})

router.put('/publish/:id', async (req, res) => {
    const { id } = req.params
    const result = await prisma.article.update({
      where: { id: Number(id) },
      data: { published: true },
    })
    res.json(result)
})
  

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.article.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(result)
})

module.exports = router;