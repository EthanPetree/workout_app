const express = require("express");
const router = express.Router();
const { WorkoutController } = require("../controllers/WorkoutController");

router.get("/", WorkoutController.getAllWorkouts);

router.post("/", WorkoutController.addWorkout);

router.put("/:id", WorkoutController.updateWorkout);

router.delete("/:id", WorkoutController.deleteWorkout);

module.exports = router;
