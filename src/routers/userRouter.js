const express = require('express')
const User = require('../models/user')
const auth = require ('../middleware/auth')

const router = new express.Router()

// Register user
router.post('/users', async (req, res )=> {
    
    const user = new User (req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
})

router.get('/users/me', auth, async (req, res)=> {
    try {
        const user = req.user
        const token = req.token
        res.status(200).send({user, token})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

router.post('/users/logout', auth, async (req,res)=> {
    const user = req.user
    try {
        user.tokens = user.tokens.filter(token => {
            return token.token !== req.token
        })
        await user.save()
        res.send()

    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

module.exports = router
