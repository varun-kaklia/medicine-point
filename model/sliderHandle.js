const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    image: {
      type: String,
      default: "banner2.jpg",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema);
