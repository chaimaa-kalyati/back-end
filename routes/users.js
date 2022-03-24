const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const result = await prisma.utilisateur.findMany()
    res.json(result)
})

router.get('/:email', async (req, res) => {
    const { email } = req.params
    const result = await prisma.utilisateur.findUnique({
        where: {
            email: email,
        },
    })
    res.json(result)
})

router.post(`/`, async (req, res) => {
    const { nom, email, password, role }  = req.body
    const result = await prisma.utilisateur.create({
        data: {
            nom: nom,
            email: email,
            password: password,
            role: role,
        },
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

router.put('/reset-info', async (req, res) => {
    const { email, nom, role } = req.body
    const result = await prisma.utilisateur.update({
        where: { email: email },
        data: { 
            nom: nom,
            role: role,
        },
    })
    res.json(result)
})

router.put('/reset-info', async (req, res) => {
    const { email, nom, role } = req.body
    const result = await prisma.utilisateur.update({
        where: { email: email },
        data: { 
            nom: nom,
            role: role,
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