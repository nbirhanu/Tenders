const fs = require('fs')
const express = require('express')

const app = express()

//READ ALL TENDERS

const tends = JSON.parse(fs.readFileSync(`${__dirname}/data/allTenders.json`))

//MIDDLEWARE
app.use(express.json())

const port = 7000
app.listen(port, () => {
	console.log(`app running on port ${port}`)
})
