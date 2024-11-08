const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/create", projectController.createProject);
router.post("/contribute", projectController.contribute);
router.post("/vote", projectController.voteOnMilestone);
router.get("/:projectId", projectController.getProjectDetails);

module.exports = router;
