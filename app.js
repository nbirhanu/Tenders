const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.json())

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

//CREATE TENDERS

app.post('/api/v1/tenders', (req, res) => {
	const newTender = Object.assign(req.body)
	console.log(newTender)
	tenders.push(newTender)
	fs.writeFile(`${__dirname}/data/allTenders.json`, JSON.stringify(tenders), err => {
		res.status(200).json({
			status: 'success',
			data: {
				tenders: newTender,
			},
		})
	})
})

//MIDDLEWARE
app.use(express.json())

//PORT
const port = 7000
app.listen(port, () => {
	console.log(`app running on port ${port}`)
})
