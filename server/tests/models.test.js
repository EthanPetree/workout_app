// destructuring assignment, it grabs exactly what you are looking for from the container and nothing else
const { ExerciseModel } = require('../models/ExerciseModel.js');
const { WorkoutModel } = require('../models/WorkoutModel.js');

// 72944bae-6a25-4a5b-a14a-5a3fbdc90983
(async () => {
    console.log(await WorkoutModel.getAllWorkouts());
    // const addResult = await WorkoutModel.addWorkout("Pull", "55 minutes");
    // console.log("Add result: ", addResult);
    // 6662b5e5-07e6-4b8e-972b-334b4efe39b4

    // const addWorkoutResult = await WorkoutModel.addExercise("6662b5e5-07e6-4b8e-972b-334b4efe39b4", "bdb10516-5995-4a9f-956f-4a3c2ffb559c", 1);
    // console.log("exercise added to workout result: ", addWorkoutResult);
    // console.log("from array: " ,await WorkoutModel.getAllExercisesFromIdArray(["bdb10516-5995-4a9f-956f-4a3c2ffb559c"]));

    console.log("exercises", await WorkoutModel.getAllExercisesFromWorkout("6662b5e5-07e6-4b8e-972b-334b4efe39b4"));


})();