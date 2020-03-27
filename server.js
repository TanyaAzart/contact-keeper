const express = require('express')
const connectDB = require('./config/db')

const app = express()
connectDB()

app.use(express.json({extended: false}))

app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require ('./routes/auth'))

app.get('/', (req, res)=>res.send('Hello World!'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))