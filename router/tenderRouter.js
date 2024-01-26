const express = require('express')
const tenderController = require('./../controller/tenderController')

const router = express.Router()

router.route('/').get(tenderController.getAllTenders).post(tenderController.createTender)

router
	.route('/:id')
	.get(tenderController.getTender)
	.patch(tenderController.updateTenders)
	.delete(tenderController.deleteTender)

module.exports = router
