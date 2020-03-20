const express = require('express')
const router = express.Router()

//register user
router.post('/', (req, res)=>{
    res.send('Register a user')
})


module.exports = router;