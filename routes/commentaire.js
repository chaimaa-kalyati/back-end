const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const result = await prisma.commentaire.findMany()
    res.json(result)
})

router.post(`/`, async (req, res) => {
    
    const result = await prisma.commentaire.create({
        data: req.body,
    })
    res.json(result)
})
module.exports = router;
