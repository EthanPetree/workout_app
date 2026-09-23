const express = require("express");
const workoutRouter = require("./routes/workout");
const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use("/workouts", workoutRouter);

app.get("/", (req, res, send) => {
    res.send("hallo guys");
});

app.use((err, req, res, next) => {
    console.error("Server Error Logged:", err.stack);
    
    res.status(500).json({ 
        error: "Something went wrong on the server." 
    });
});

app.listen(PORT, () => {
    console.log(`express listening on http://localhost:${PORT}`);
});
