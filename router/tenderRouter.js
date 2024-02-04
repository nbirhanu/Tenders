const express = require('express');
const tenderController = require('./../controller/tenderController');
// const { router } = require('../app');

const router = express.Router();

//
router
  .route('/ethiotelecom')
  .get(tenderController.ethioTelecom, tenderController.getAllTenders);

router
  .route('/')
  .get(tenderController.getAllTenders)
  .post(tenderController.createTender);

router
  .route('/:id')
  .get(tenderController.getTender)
  .patch(tenderController.updateTenders)
  .delete(tenderController.deleteTender);

module.exports = router;
