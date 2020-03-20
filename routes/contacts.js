const express = require('express')
const router = express.Router()

//get all user's contacts
router.get('/', (req, res)=>{
    res.send()
})

//add new contact
router.post('/', (req, res)=>{
    res.send()
})

//update contact
router.put('/:id', (req, res)=>{
    res.send()
})

//delete contact
router.delete('/', (req, res)=>{
    res.send()
})

module.exports = router;