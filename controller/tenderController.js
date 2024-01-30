const fs = require('fs');
const Tender = require('./../models/tenderModel');

//CREATE TENDER
exports.createTender = async (req, res) => {
  try {
    const newTender = await Tender.create();
    res.status(200).json({
      status: 'success',
      data: {
        tenders: newTender,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

//GET TENDERS
exports.getAllTenders = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      result: tenders.length,
      data: {
        tenders,
      },
    });
  } catch (err) {}
};

//get tender by id
exports.getTender = (req, res) => {
  const id = +req.params.id;
  const tender = tenders.find((el) => el.id === id);
  if (!tender) {
    return res.status(204).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tender,
    },
  });
};

// UPDATE TENDER
exports.updateTenders = (req, res) => {
  const id = +req.params.id;
  if (id > tenders.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: '<update tender here...>',
  });
};

//DELETE TENDER
exports.deleteTender = (req, res) => {
  const id = +req.params.id;
  if (id > tenders.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tender: null,
    },
  });
};
