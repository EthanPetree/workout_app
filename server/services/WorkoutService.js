const { WorkoutRepo } = require("../repositories/WorkoutRepo");
const { ExerciseRepo } = require("../repositories/ExerciseRepo");

class WorkoutService {
    static async validateWorkout(workout) {
        if (workout.type && workout.length && workout.exercises) {
            return;
        } else {
            throw new Error(
                "Workout is not valid, make sure all fields are correct",
            );
        }
    }

    static async validateUUID(uuid) {}

    static async getAllWorkouts() {
        const workouts = await WorkoutRepo.getAllWorkouts();
        return workouts;
    }

    static async getAllExercisesFromWorkout(workout_id) {
        if (!this.validateUUID) throw new Error("Workout id is not valid");
    }

    static async addWorkout(type, length) {
        // 1. Baseline Validation
        this.validateWorkout(workout);
        // 2. Logical Constraints
        if (length && length > 15) {
            throw new Error("Workout length must be 15 or under.");
        }
        // 3. Data Formatting
        const typeFormatted = type?.trim()?.toUpperCase();
        // 4. Persistence
        const rowsAffected = await WorkoutRepo.addWorkout(
            typeFormatted,
            length,
        );

        return rowsAffected;
    }

    static async updateWorkout(type, length, id) {
        // 1. Baseline Validation
        // 2. Logical Constraints
        // 3. Data Formatting
        // 4. Persistence
    }

    static async deleteWorkout(workout_id) {
        // 1. Baseline Validation
        // 2. Logical Constraints
        // 3. Data Formatting
        // 4. Persistence
    }

    static async getWorkoutById(workout_id) {
        // 1. Baseline Validation
        // 2. Logical Constraints
        // 3. Data Formatting
        // 4. Persistence
    }

    static async addExerciseToWorkout(workout_id, exercise_id, sequence_order) {
        // 1. Baseline Validation
        // 2. Logical Constraints
        // 3. Data Formatting
        // 4. Persistence
    }
    static async removeExerciseFromWorkout(workout_id, exercise_id) {
        // 1. Baseline Validation
        // 2. Logical Constraints
        // 3. Data Formatting
        // 4. Persistence
    }
}

module.exports = { WorkoutService };
