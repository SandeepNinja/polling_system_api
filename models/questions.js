const mongoose = require("mongoose");
const Options = require("./options");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    option: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Options,
      },
    ],
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questionSchema);
module.exports = Questions;
