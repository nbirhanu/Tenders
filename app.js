const fs = require('fs')
const express = require('express')

const app = express()

//MIDDLEWARE
app.use(express.json())

const port = 7000
app.listen(port, () => {
	console.log(`app running on port ${port}`)
})
