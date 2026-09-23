const fs = require("node:fs/promises");

class WorkoutProccessor {
    // let workout = {
    //         _id: randomUUID(),
    //         type: data.type,
    //         length: data.length,
    //         exercises: data.exercises,
    //     };
    static validateData(workout) {
        return workout.type && workout.length && workout.exercises;
    }

    static async pushWorkout(workout) {
        if (WorkoutProccessor.validateData(workout)) {
            let workouts = await WorkoutProccessor.readWorkoutsFromFile();
            if (!workouts || !Array.isArray(workouts)) {
                workouts = [];
            }
            workouts.push(workout);
            await WorkoutProccessor.updateWorkouts(workouts);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param {object} workout
     */
    static async updateWorkout (workout){
        //search by id
        //dont add if not found
        // let result = workouts.find(workout => workout._id === workoutId);
        let workouts = await WorkoutProccessor.readWorkoutsFromFile();
        let workoutIndex = WorkoutProccessor.findWorkoutIndexById(
            workouts,
            workout._id,
        );

        if (workoutIndex != -1) {
            console.log(`workout exists ${workoutIndex}`);
            workouts[workoutIndex] = workout;
            await WorkoutProccessor.updateWorkouts(workouts);
            return true;
        } else {
            return false;
        }
    };

    static async deleteWorkout(workoutId){
        //search by id
        //dont add if not found
        // let result = workouts.find(workout => workout._id === workoutId);
        let workouts = await WorkoutProccessor.readWorkoutsFromFile();
        let workoutIndex = WorkoutProccessor.findWorkoutIndexById(
            workouts,
            workoutId,
        );

        if (workoutIndex !== -1) {
            console.log(`workout exists ${workoutIndex}`);
            workouts.splice(workoutIndex, 1);
            await WorkoutProccessor.updateWorkouts(workouts);
            return true;
        } else {
            return false;
        }
    };

    static findWorkoutIndexById(workouts, workoutId) {
        for (let i = 0; i < workouts.length; i++) {
            if (workouts[i]._id === workoutId) {
                return i;
            }
        }
        return -1;
    }

    /**
     * @param {object} workouts
     */
    static async updateWorkouts(workouts) {
        const data = JSON.stringify(workouts);
        try {
            await fs.writeFile("./data/workoutsData.json", data, "utf-8");
        } catch (e) {
            if (e.code === "ENOENT") return [];
            console.error(e);
        }
    }

    static async readWorkoutsFromFile() {
        let workouts;
        try {
            workouts = await fs.readFile("./data/workoutsData.json");
        } catch (e) {
            if (e.code === "ENOENT") return [];
            console.error(e);
        }
        return JSON.parse(workouts);
    }
}

module.exports = WorkoutProccessor;
