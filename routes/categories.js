const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const result = await prisma.categorie.findMany()
    res.json(result)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await prisma.categorie.findUnique({
        where: {
            id: Number(id),
        },
    })
    res.json(result)
})

router.post(`/`, async (req, res) => {
    const { nom }  = req.body
    const result = await prisma.categorie.create({
      data: {
        nom: nom,
      },
    })
    res.json(result)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nom } = req.body
    const result = await prisma.categorie.update({
      where: { id: Number(id) },
      data: { 
        nom: nom,
       },
    })
    res.json(result)
})

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.categorie.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(result)
})

module.exports = router;