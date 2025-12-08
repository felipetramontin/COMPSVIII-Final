const express = require('express');
const app = express();
const exercisesRouter = require('./routes/exercises');

app.use(express.json());
app.use(express.static('public')); // serve frontend

app.use('/api/exercises', exercisesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
