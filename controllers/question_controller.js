const Questions = require("../models/questions");
const Options = require("../models/options");

module.exports.questions = async function (req, res) {
  try {
    const questions = await Questions.find({}).populate("option");

    return res.status(200).json({
      message: "all question display here",
      status: "success",
      data: questions,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error in displaying questions",
      status: "failure",
      data: [],
    });
  }
};

module.exports.createQuestion = async function (req, res) {
  if (req.body.title.length == 0) {
    return res.status(404).json({
      message: "Error in creating question:: title is empty",
      status: "failure",
      data: [],
    });
  }
  try {
    const createQuestion = await Questions.create({ title: req.body.title });
    return res.status(200).json({
      message: "Question successfully created",
      status: "success",
      data: createQuestion,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error in creating question",
      status: "failure",
      data: [],
    });
  }
};

module.exports.deleteQuestion = async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: "Error in deleting Question",
        status: "failure",
        data: [],
      });
    }

    // find question in database
    const question = await Questions.findById({ _id: req.params.id });
    if (!question) {
      return res.status(404).json({
        message: "Error in deleting Question",
        status: "failure",
        data: [],
      });
    }
    // delete options of that question from database
    question.option.forEach(async (optID) => {
      await Options.findByIdAndDelete(optID);
    });

    // delete question from database
    await Questions.findByIdAndDelete(req.params.id);

    // send success report
    return res.status(200).json({
      message: "Question successfully deleted",
      status: "success",
      data: [],
    });
  } catch (error) {
    // send failure report
    return res.status(404).json({
      message: "Error in deleting Question",
      status: "failure",
      data: [],
    });
  }
};

module.exports.questionById = async function (req, res) {
  try {
    const questionId = req.params.id;
    if (!questionId) {
      return res.status(404).json({
        message: "Question not found",
        status: "failure",
        data: [],
      });
    }

    const question = await Questions.findById({ _id: questionId });
    if (!question) {
      if (!questionId) {
        return res.status(404).json({
          message: "Question not found",
          status: "failure",
          data: [],
        });
      }
    }
    return res.status(200).json({
      message: "Question successfully deleted",
      status: "success",
      data: question,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Question not found",
      status: "failure",
      data: [],
    });
  }
};
