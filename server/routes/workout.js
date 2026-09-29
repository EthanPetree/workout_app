const express = require("express");
const { randomUUID } = require("crypto");
const WorkoutProccessor = require("../services/WorkoutProccessor");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const workouts = await WorkoutProccessor.readWorkoutsFromFile();
        res.status(200).json(workouts);
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let data = req.body;
        let workout = {
            _id: randomUUID(),
            type: data.type,
            length: data.length,
            exercises: data.exercises,
        };
        let success = await WorkoutProccessor.pushWorkout(workout);
        if (success) {
            res.status(201).json({
                workout,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Validation failed",
                errors: {
                    // should middleware or something go around here?
                },
            });
        }
    } catch (e) {
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        let data = req.body;
        let workoutId = req.params.id;
        if (data) {
            let workout = {
                _id: workoutId,
                type: data.type,
                length: data.length,
                exercises: data.exercises,
            };
            let success = await WorkoutProccessor.updateWorkout(workout);
            if (success) {
                return res
                    .status(200)
                    .json({ message: "success", result: workout });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Item not found.",
                });
            }
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    let workoutId = req.params.id;
    try {
        let success = await WorkoutProccessor.deleteWorkout(workoutId);
        if (success) {
            return res.sendStatus(204);
        } else {
            return res.status(400).json({
                success: false,
                message: "Item not found.",
            });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
