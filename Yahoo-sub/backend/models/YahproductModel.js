const mongoose = require('mongoose');

const YahproductSchema = mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    no: {
        type: Number,
        required: true,
      },
    pro_URL: {
      type: String,
      required: true,
    },
    last_URL: {
      type: String,
      required: true,
    }
  }
);

const YahProduct = mongoose.model('YahProduct', YahproductSchema);

module.exports = YahProduct;
