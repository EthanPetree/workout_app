const db = require('./repositories/db');

// await db.query('query here');
export class ExerciseModel {
    async findExerciseById(id) {
        let data = db.query(`SELECT * FROM exercises WHERE id = ${id}`);

        let rows = data.rows;

        // TODO: study what map does exactly
        return rows.map(row => {
            return {
                id: row.id,
                // etc for the exercise fields
            };
        });
    }
}