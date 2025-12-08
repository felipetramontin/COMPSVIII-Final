const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/exercises.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw || '[]');
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all exercises
router.get('/', (req, res) => {
  res.json(readData());
});

// POST new exercise
router.post('/', (req, res) => {
  const exercises = readData();
  const newExercise = { id: Date.now(), ...req.body, completed: false };
  exercises.push(newExercise);
  saveData(exercises);
  res.json(newExercise);
});

// DELETE
router.delete('/:id', (req, res) => {
  let exercises = readData();
  exercises = exercises.filter(e => e.id != req.params.id);
  saveData(exercises);
  res.sendStatus(204);
});

module.exports = router;
