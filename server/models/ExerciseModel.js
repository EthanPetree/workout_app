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

    static async findExerciseByName(name){
        const text = 'SELECT * FROM exercises WHERE name = $1 LIMIT 1';
        const values = [name];

        const data = await db.query(text, values);

        return data?.rows?.[0];
    }

    static async getAllExercises(){
        const text = 'SELECT * FROM exercises';

        const data = await db.query(text);

        return data?.rows;
    }

    static async getAllExercisesByCategory(category){
        const text = 'SELECT * FROM exercises WHERE category = $1';
        const values = [category];

        const data = await db.query(text, values);

        return data?.rows;
    }

    static async addExercise(name, category){
        // exercise_id name category(nullable)
        if (!(name && category)) return;
        const text = 'INSERT INTO exercises (name, category) VALUES ($1, $2)';
        const values = [name, category];

        const result = await db.query(text, values);

        return result;
    }

    static async modifyExercise(name, category, id){
        if (!(name && category)) return 0;

        const text = 'UPDATE exercises SET name = $1, category = $2 WHERE exercise_id = $3';
        const values = [name, category, id];

        const result = await db.query(text, values);

        return result?.rowCount;

    }
    
    static async deleteExercise(id){
        const text = 'DELETE FROM exercises WHERE exercise_id = $1';
        const values = [id];

        const result = await db.query(text, values);

        return result?.rowCount;

    }
}

module.exports = { ExerciseModel };