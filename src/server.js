const express = require('express')
const cors = require('cors')

require('./db/mongoose')

const contactRouter = require('./routers/contactRouter')
const userRouter = require('./routers/userRouter')

const server = express()
const port = process.env.PORT || 4000

const corsOptions ={
    credentials: true
}

server.use(cors())


server.use(express.json())
server.use(contactRouter)
server.use(userRouter)

server.use('/', (req,res)=>{
    res.send('Hello!')
})

server.listen(port, ()=>{
    console.log('Server is running on port ', port)
})

