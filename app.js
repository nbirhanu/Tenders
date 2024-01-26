const express = require('express')
const morgan = require('morgan')
const tenderRouter = require('./router/tenderRouter')
const userRouter = require('./router/useRouter')
const app = express()

//MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))

//ROUTERS
app.use('/api/v1/tenders', tenderRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
