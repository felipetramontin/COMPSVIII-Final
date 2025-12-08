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

// PUT (edit)
router.put('/:id', (req, res) => {
  const exercises = readData();
  const index = exercises.findIndex(e => e.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  exercises[index] = { ...exercises[index], ...req.body };
  saveData(exercises);
  res.json(exercises[index]);
});

// PATCH (complete)
router.patch('/:id', (req, res) => {
  const exercises = readData();
  const index = exercises.findIndex(e => e.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  exercises[index].completed = !exercises[index].completed;
  saveData(exercises);
  res.json(exercises[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  let exercises = readData();
  exercises = exercises.filter(e => e.id != req.params.id);
  saveData(exercises);
  res.sendStatus(204);
});

module.exports = router;
