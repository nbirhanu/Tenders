const fs = require('fs');
const Tender = require('./../models/tenderModel');

//CREATE TENDER
exports.createTender = async (req, res) => {
  try {
    const newTender = await Tender.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTender,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};

//ETHIO TELECOM
exports.ethioTelecom = (req, res, next) => {
  req.query.catagory = 'telecom';
  next();
};

//GET TENDERS
exports.getAllTenders = async (req, res) => {
  try {
    //FILTERING
    const queryObj = { ...req.query };
    const excludedField = ['limit', 'page', 'sort', 'fields'];
    excludedField.forEach((el) => delete queryObj[el]);

    //ADVANCEFILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tender.find(JSON.parse(queryStr));

    //SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt companyName');
    }

    //FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //PAGINATION
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const toursNum = Tender.countDocuments();
      if (skip >= toursNum) throw new Error('this page does not exist!!!');
    }

    //EXCUTE
    const tenders = await query;

    res.status(200).json({
      status: 'success',
      result: tenders.length,
      data: {
        tenders,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};

//get tender by id
exports.getTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tender,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};

// UPDATE TENDER
exports.updateTenders = async (req, res) => {
  try {
    const updatedTender = await Tender.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        updatedTender,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};

//DELETE TENDER
exports.deleteTender = async (req, res) => {
  try {
    const deleteTender = await Tender.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        deleteTender,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};
