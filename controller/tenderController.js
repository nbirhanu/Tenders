const fs = require('fs')

const tenders = JSON.parse(fs.readFileSync(`${__dirname}/../data/allTenders.json`))

//GET TENDERS
exports.getAllTenders = (req, res) => {
	res.status(200).json({
		status: 'success',
		result: tenders.length,
		data: {
			tenders,
		},
	})
}

//CREATE TENDER
exports.createTender = (req, res) => {
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
exports.getTender = (req, res) => {
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
exports.updateTenders = (req, res) => {
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
exports.deleteTender = (req, res) => {
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
