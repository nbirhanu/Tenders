const fs = require('fs')
const express = require('express')

const app = express()

//READ ALL TENDERS

const tenders = JSON.parse(fs.readFileSync(`${__dirname}/data/allTenders.json`))

//GET TENDERS
app.get('/api/v1/tenders', (req, res) => {
	res.status(200).json({
		status: 'success',
		result: tenders.length,
		data: {
			tenders,
		},
	})
})

//MIDDLEWARE
app.use(express.json())

//PORT
const port = 7000
app.listen(port, () => {
	console.log(`app running on port ${port}`)
})
