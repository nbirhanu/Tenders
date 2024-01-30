const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'a tender must have a companyName'],
  },
  catagory: {
    type: String,
    required: [true, 'a tender must have a catagory'],
  },
  publishedOn: {
    type: String,
    required: [true, 'a tender must have a publishedOn'],
  },
  bidOpeningDate: {
    type: String,
    required: [true, 'a tender must have a bidOpeningDate'],
  },
  BidAnnouncementNo: {
    type: String,
    required: [true, 'a tender must have a BidAnnouncementNo'],
  },
  title: {
    type: String,
    required: [true, 'a tender must have a title'],
  },
  description: {
    des1: {
      type: String,
    },
    des2: {
      type: String,
    },
    des3: {
      type: String,
    },
    des4: {
      type: String,
    },
    des5: {
      type: String,
    },
    des6: {
      type: String,
    },
    des7: {
      type: String,
    },
  },
});

const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
