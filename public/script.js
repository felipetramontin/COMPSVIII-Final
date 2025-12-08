const form = document.getElementById('exercise-form');
const list = document.getElementById('exercise-list');

let exercises = [];

// Fetch exercises from server
async function fetchExercises() {
    const res = await fetch('/api/exercises');
    exercises = await res.json();
    renderExercises();
  }

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

// Toggle complete
async function toggleComplete(id) {
    const res = await fetch(`/api/exercises/${id}`, { method: 'PATCH' });
    const updated = await res.json();
    exercises = exercises.map(ex => ex.id === id ? updated : ex);
    renderExercises();
  }
  
  // Edit exercise
  function editExercise(id) {
    const ex = exercises.find(ex => ex.id === id);
    form.name.value = ex.name;
    form.sets.value = ex.sets;
    form.reps.value = ex.reps;
    form.weight.value = ex.weight || '';
    
    // Remove previous submit listener
    form.onsubmit = async function(e) {
      e.preventDefault();
      const updatedData = {
        name: form.name.value,
        sets: parseInt(form.sets.value),
        reps: parseInt(form.reps.value),
        weight: form.weight.value ? parseInt(form.weight.value) : null
      };
      const res = await fetch(`/api/exercises/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const updated = await res.json();
      exercises = exercises.map(ex => ex.id === id ? updated : ex);
      renderExercises();
      form.reset();
  
      // Restore default submit listener
      form.onsubmit = defaultFormSubmit;
    };
  }