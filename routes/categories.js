const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const categories = await prisma.categorie.findMany()
    res.json(categories)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const categorie = await prisma.categorie.findUnique({
        where: {
            id: Number(id),
        },
    })
    res.json(categorie)
})

router.post(`/`, async (req, res) => {
    
    const result = await prisma.categorie.create({
        data: req.body,
    })
    res.json(result)
})
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name} = req.body

    try {
        const post = await prisma.categorie.update({
            where: { id: Number(id) },
            data: {
                name: name
                
            },
        })

        res.json(post)
    } catch (error) {
        res.json({ error: `Item with ID ${id} does not exist in the database` })
    }
})

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params
    const categorie = await prisma.categorie.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(categorie)
})

module.exports = router;