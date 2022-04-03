const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const result = await prisma.utilisateur.findMany()
    res.json(result)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await prisma.utilisateur.findUnique({
        where: {
            id:Number(id),
        },
    })
    res.json(result)
})

router.post(`/`, async (req, res) => {
    
    const result = await prisma.utilisateur.create({
        data: req.body,
    })
    res.json(result)
})

router.put('/reset-password', async (req, res) => {
    const { email, password } = req.body
    const result = await prisma.utilisateur.update({
        where: { email: email },
        data: { 
            password: password,
        },
    })
    res.json(result)
})

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params
    const utilisateur = await prisma.utilisateur.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(utilisateur)
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { role } = req.body
    const result = await prisma.utilisateur.update({
      where: { id: Number(id) },
      data: { 
      
            role: role
       },
    })
    res.json(result)
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.utilisateur.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        res.status(401).send("Utilisateur n'existe pas");
    }
    if (user.password != password) {
        res.status(401).send("mot de passe erroné");
    } else {
        delete user.password
        delete user.id
        res.json(user)
    }    
})

module.exports = router;