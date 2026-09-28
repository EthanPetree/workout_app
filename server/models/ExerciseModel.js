const db = require('../repositories/db.js');

// await db.query('query here');
class ExerciseModel {
    static async findExerciseById(id) {
        // \d table_name for the schema
        const text = 'SELECT * FROM exercises WHERE exercise_id = $1';

        // let data = await db.query(`SELECT * FROM exercises WHERE id = ${id}`);
        //  bad practice as string interpolation doesnt' work how you may want it
        //  to and its a big security risk

        // goes sequentially starting from one, use $num in your text line
        const values = [id];
        let data = await db.query(text, values);
        let rows = data.rows;

        // TODO: study what map does exactly
        // return rows.map(row => {
        //     console.log("row: ", row);
        //     return {
        //         id: row.exercise_id,
        //         // etc for the exercise fields
        //     };
        // });
        
        // optional chaining ?.
        return rows?.[0];
    }
}

module.exports = { ExerciseModel };