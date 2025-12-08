const form = document.getElementById('exercise-form');
const list = document.getElementById('exercise-list');

let exercises = [];

function renderExercises() {
    list.innerHTML = '';
    exercises.forEach(ex => {
        const li = document.createElement('li');
        li.className = 'exercise-item';
        if (ex.completed) li.classList.add('completed');

        li.innerHTML = `
        <span>${ex.name} - ${ex.sets} x ${ex.reps} ${ex.weight ? `- ${ex.weight} lbs` : ''}</span>
        <div>
          <button onclick="toggleComplete(${ex.id})">${ex.completed ? 'Undo' : 'Complete'}</button>
          <button onclick="editExercise(${ex.id})">Edit</button>
          <button onclick="deleteExercise(${ex.id})">Delete</button>
        </div>
      `;
        list.appendChild(li);
    });
}


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

// Delete exercise
async function deleteExercise(id) {
    await fetch(`/api/exercises/${id}`, { method: 'DELETE' });
    exercises = exercises.filter(ex => ex.id !== id);
    renderExercises();
}  