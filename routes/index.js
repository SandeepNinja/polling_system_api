const express = require("express");
const router = express.Router();
const optionController = require("../controllers/option_controller");
const questionController = require("../controllers/question_controller");

// get all data
router.get("/questions", questionController.questions);

//(To create a question)
router.post("/questions/create", questionController.createQuestion);
// //(To add options to a specific question)
router.post("/questions/:id/options/create", optionController.create);
// //(To delete a question)
router.get("/questions/:id/delete", questionController.deleteQuestion);
// //(To delete an option)
router.get("/options/:id/delete", optionController.deleteOption);
// //(To increment the count of votes)
router.get("/options/:id/add_vote", optionController.addVote);
// //(To view a question and it’s options)
router.get("/questions/:id", questionController.questionById);

module.exports = router;
