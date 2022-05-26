const express = require ('express')
const Contact = require('../models/contact')
const auth = require('../middleware/auth')

const router = new express.Router()

// Add contact
router.post('/contacts', auth, async (req, res)=> {
    const contact = new Contact({
        ...req.body,
        owner: req.user._id
    })

    try {
        await contact.save()
        res.status(201).send(contact)

    } catch (err) {  
        res.status(400).send(err.message)
    }
})

router.patch('/contacts/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const contact = await Contact.findOne({ _id: req.params.id, owner: req.user._id})

        if (!contact) {
            return res.status(401).send('Contact not found!')
        }
        updates.forEach(update => contact[update]=req.body[update])

        await contact.save()
        res.status(201).send(contact)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.delete('/contacts/:id', auth, async (req, res)=> {
    try {
        const contact = await Contact.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!contact) {
            return res.status(401).send('Contact not found!')
        }
        res.send(contact)
    } catch (err) {
        res.status(400).send()
    }
})

// Get contacts
router.get('/contacts', auth, async (req, res)=> {
    try {
    const contacts = await Contact.find({owner: req.user._id}).sort({ updatedAt: -1})
    res.send(contacts)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router