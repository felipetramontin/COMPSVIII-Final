const form = document.getElementById('exercise-form');

let exercises = [];

// Add exercise
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newExercise = {
        name: form.name.value,
        sets: parseInt(form.sets.value),
        reps: parseInt(form.reps.value),
        weight: form.weight.value ? parseInt(form.weight.value) : null
    };
    const res = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExercise)
    });
    const added = await res.json();
    exercises.push(added);
    renderExercises();
    form.reset();
});

