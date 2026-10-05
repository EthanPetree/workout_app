const db = require("./db_connection.js");

class WorkoutRepo {
    static async exists(id) {
        const text = "SELECT 1 FROM workout WHERE workout_id = $1 LIMIT 1";
        const values = [id];

        const result = await db.query(text, values);

        return result?.rows.length > 0;
    }

    static async findWorkoutById(id) {
        const text = "SELECT * FROM workout WHERE workout_id = $1";
        const values = [id];

        let data = await db.query(text, values);

        return data?.rows?.[0];
    }

    static async getAllWorkouts() {
        const text = "SELECT * FROM workout";

        let data = await db.query(text);

        return data?.rows;
    }

    static async addWorkout(type, length) {
        // workout_id type length(nullable)
        if (!(type && length)) return;
        const text = "INSERT INTO workout (type, length) VALUES ($1, $2)";
        const values = [type, length];

        const result = await db.query(text, values);

        return result?.values;
    }

    static async updateWorkout(type, length, id) {
        if (!(type && length)) return 0;

        const text = "UPDATE workout SET type = $1, length = $2 WHERE workout_id = $3";
        const values = [type, length, id];

        const result = await db.query(text, values);

        return result?.rowCount;
    }

    static async deleteWorkout(id) {
        const text = "DELETE FROM workout WHERE workout_id = $1";
        const values = [id];

        const result = await db.query(text, values);

        return result?.rowCount;
    }

    static async getAllExercisesFromWorkout(workout_id) {
        const text = "SELECT * FROM workout_exercises WHERE workout_id = $1";
        const values = [workout_id];

        const result = await db.query(text, values);

        const data = result?.rows;

        let exercises = data.map((exercise) => {
            return exercise?.exercise_id;
        });

        return (await this.getAllExercisesFromIdArray(exercises)) || exercises;
    }

    static async getAllExercisesFromIdArray(arr) {
        const text = "SELECT * FROM exercises WHERE exercise_id = ANY($1)";
        const values = [arr];

        const data = await db.query(text, values);

        const result = data?.rows;

        return result;
    }

    static async addExercise(workout_id, exercise_id, sequence_order) {
        const text = "INSERT INTO workout_exercises (workout_id, exercise_id, sequence_order) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING";
        const values = [workout_id, exercise_id, sequence_order];

        const result = await db.query(text, values);

        return result?.rowCount;
    }

    static async removeExercise(workout_id, exercise_id) {
        const text = "DELETE FROM workout_exercises WHERE workout_id = $1 AND exercise_id = $2";
        const values = [workout_id, exercise_id];

        const result = await db.query(text, values);

        return result?.rowCount;
    }
}

module.exports = { WorkoutRepo };
