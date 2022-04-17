require('dotenv').config()
const express = require('express')
const cron = require('node-cron')
const app = express()
const port = 5000
const router = require('./src/routes')
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use('/api/v1/', router)

app.listen(port , () => console.log(`Listen to port ${port}`))