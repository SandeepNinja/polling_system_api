const Questions = require("../models/questions");
const Options = require("../models/options");

module.exports.create = async function (req, res) {
  const baseURL = "http://localhost:8000/options";
  try {
    const option = await Options.create({
      text: req.body.text,
    });
    option.link_to_vote = `${baseURL}/${option.id}/add_vote`;
    option.save();

    const question = await Questions.updateOne(
      { _id: req.params.id },
      { $push: { option: option._id } }
    );
    return res.status(200).json({
      message: "Option created successfully",
      success: "success",
      data: option,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error in creating option",
      success: "failure",
      data: [],
    });
  }
};

module.exports.deleteOption = async function (req, res) {
  try {
    const question = await Questions.findOneAndUpdate(
      { option: req.params.id },
      { $pull: { option: req.params.id } }
    );

    await Options.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Option successfully deleted",
      status: "success",
      data: [],
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error in deleting Option",
      status: "failure",
      data: [],
    });
  }
};

module.exports.addVote = async function (req, res) {
  try {
    const optionID = req.params.id;
    if (!optionID) {
      return res.status(404).json({
        message: "Error in updating VOTES",
        status: "failure",
        data: [],
      });
    }
    const option = await Options.findById({ _id: optionID });

    if (!option) {
      return res.status(404).json({
        message: "Error in updating VOTES",
        status: "failure",
        data: [],
      });
    }

    option.votes++;
    option.save();

    return res.status(200).json({
      message: "VOTES upadted successfully",
      status: "success",
      data: option,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error in updating VOTES",
      status: "failure",
      data: [],
    });
  }
};
