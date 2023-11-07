const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
