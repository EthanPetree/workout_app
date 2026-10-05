const { WorkoutService } = require("../services/WorkoutService");

class WorkoutController {
    static async getWorkoutById(req, res) {
        try {
            const { workout_id } = req.params;

            const result = await WorkoutService.getWorkoutById(workout_id);

            return res.status(200).json({
                message: "Workout grabbed successfully!",
                workout: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }

    static async getAllWorkouts(req, res) {
        try {
            const result = await WorkoutService.getAllWorkouts();

            return res.status(200).json({
                message: "Workouts grabbed successfully!",
                workouts: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }

    static async addWorkout(req, res) {
        try {
            const { type, length } = req?.body;

            const result = await WorkoutService.addWorkout(type, length);

            return res.status(201).json({
                message: "Workout added successfully!",
                rowsAffected: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }

    static async updateWorkout(req, res) {
        try {
            const workout_id = req.params?.id;
            const { type, length } = req.body;

            const result = await WorkoutService.updateWorkout(workout_id, type, length);

            return res.status(201).json({
                message: "Workout added successfully!",
                rowsAffected: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }

    static async deleteWorkout(req, res) {
        try {
            const workout_id = req.params?.id;

            const result = await WorkoutService.deleteWorkout(workout_id);

            return res.status(200).json({
                message: "Workout deleted successfully!",
                rowsAffected: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }

    static async addExerciseToWorkout(req, res) {
        try {
            const { workout_id, exercise_id, sequence_order } = req.params;

            const result = await WorkoutService.addExerciseToWorkout(workout_id, exercise_id, sequence_order);

            return res.status(201).json({
                message: "Exercise added successfully!",
                rowsAffected: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }

    static async removeExerciseFromWorkout(req, res) {
        try {
            const { workout_id, exercise_id, sequence_order } = req.params;

            const result = await WorkoutService.addExerciseToWorkout(workout_id, exercise_id, sequence_order);

            return res.status(200).json({
                message: "Exercise removed successfully!",
                rowsAffected: result,
            });
        } catch (error) {
            return res.status(404).json({ error: error?.message });
        }
    }
}

module.exports = { WorkoutController };
