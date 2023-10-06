const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    link_to_vote: {
      type: String,
    },
  },
  { timestamps: true }
);

const Options = mongoose.model("Options", optionSchema);

module.exports = Options;
