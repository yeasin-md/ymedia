const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    link: { type: String, required: true },
    cName: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', BannerSchema);
