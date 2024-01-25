const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()

//MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))

//READ ALL TENDERS

const tenders = JSON.parse(fs.readFileSync(`${__dirname}/data/allTenders.json`))

//GET TENDERS
const getAllTenders = (req, res) => {
	res.status(200).json({
		status: 'success',
		result: tenders.length,
		data: {
			tenders,
		},
	})
}

//CREATE TENDER
const createTender = (req, res) => {
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
}
//get tender by id
const getTender = (req, res) => {
	const id = +req.params.id
	const tender = tenders.find(el => el.id === id)
	if (!tender) {
		return res.status(204).json({
			status: 'fail',
			message: 'invalid id',
		})
	}
	res.status(200).json({
		status: 'success',
		data: {
			tender,
		},
	})
}
// UPDATE TENDER
const updateTenders = (req, res) => {
	const id = +req.params.id
	if (id > tenders.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'invalid id',
		})
	}

	res.status(200).json({
		status: 'success',
		data: '<update tender here...>',
	})
}
//DELETE TENDER
const tenderTender = (req, res) => {
	const id = +req.params.id
	if (id > tenders.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'invalid id',
		})
	}
	res.status(204).json({
		status: 'success',
		data: {
			tender: null,
		},
	})
}

app.route('/api/v1/tenders').get(getAllTenders).post(createTender)
app.route('/api/v1/tenders/:id').get(getTender).patch(updateTenders).delete(tenderTender)

//PORT
const port = 7000
app.listen(port, () => {
	console.log(`app running on port ${port}`)
})
