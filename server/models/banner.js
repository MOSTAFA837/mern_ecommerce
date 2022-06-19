const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bannerSchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "Category",
    },
    image: String,
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 40,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
