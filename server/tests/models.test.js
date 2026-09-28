// destructuring assignment, it grabs exactly what you are looking for from the container and nothing else
const { ExerciseModel } = require('../models/ExerciseModel.js');

// 72944bae-6a25-4a5b-a14a-5a3fbdc90983
(async () => {
    let data = await ExerciseModel.findExerciseById("72944bae-6a25-4a5b-a14a-5a3abdc90983");
    // let data = await ExerciseModel.findExerciseById("72944bae-6a25-4a5b-a14a-5a3fbdc90983");
    console.log("data: ", data);
})();