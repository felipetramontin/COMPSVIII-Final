# Workout Manager

Workout Manager is a streamlined, single-page web application that allows users to track exercises, sets, reps, and weights in real time. The application focuses on simplicity, speed, and usability to help individuals manage their workout routines without distractions.

---

## Project Status

This project is currently feature-complete for core functionality, including exercise creation, editing, deletion, and persistent storage using a JSON file. Deployment support has been expanded to include Docker and Google Cloud Run.

---

## Technology Stack

### Frontend
- HTML5  
- CSS3  
- JavaScript

### Backend
- Node.js  
- Express.js

### Storage
- JSON file–based local persistence (`workouts.json`)

### Deployment
- Local development server  
- Containerized deployment via Docker  
- Google Cloud Run deployment

---

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/felipetramontin/COMPSVIII-Final.git
```

### 2. Navigate to the project directory
```
cd COMPSVIII-Final
```

### 3. Install backend dependencies
```
npm install
```

### 4. Start the server
```
node server.js
```

### 5. Open the app in your browser
```
http://localhost:8080
```

Note: The server automatically uses `process.env.PORT` when deployed in cloud environments such as Google Cloud Run.

---

## Project Structure

```
/workout-manager
│── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
│── workouts.json
│── server.js
│── Dockerfile
│── package.json
└── README.md
```

---

## Features

### Add Exercises
Users can add new exercises including name, sets, reps, and weight.

### Edit Exercises
Modify existing entries.

### Delete Exercises
Remove exercises instantly.

### Mark as Complete
Visually mark exercises as finished.

### Persistent Storage
All exercise data is saved in a JSON file.

### Real-Time UI Updates
Changes appear instantly without needing to reload the page.

---

## Usage Example

1. Fill out the form with exercise name, sets, reps, and weight.  
2. Click "Add Exercise" to save it.  
3. Use "Edit" to modify an entry.  
4. Use "Delete" to remove an exercise.  
5. Click "Complete" to mark the exercise as finished.

---

## Docker Support

### Build the Docker image
```
docker build -t workout-manager .
```

### Run the container
```
docker run -p 8080:8080 workout-manager
```

Then open:
```
http://localhost:8080
```

---

## Deploying on Google Cloud Run

### Build and submit the Docker image
```
gcloud builds submit --tag gcr.io/PROJECT-ID/workout-manager
```

### Deploy to Cloud Run
```
gcloud run deploy workout-manager   --image gcr.io/PROJECT-ID/workout-manager   --platform managed   --region us-central1   --allow-unauthenticated
```

Replace `PROJECT-ID` with your Google Cloud project ID.

---

## AI Tool Usage During Development

AI tools (primarily ChatGPT) were used during development for the following tasks:

1. Debugging Node.js and Express backend issues  
2. Ensuring compatibility with Google Cloud Run (correct port binding using `process.env.PORT`)  
3. Generating and refining the Dockerfile  
4. Troubleshooting Cloud Run startup and port errors  
5. Clarifying Git, GitHub, and Google Cloud deployment workflows  
6. Writing and refining this README  
7. Explaining project organization best practices

AI was used strictly as a coding assistant, not to generate the entire project.

---

## Future Enhancements

- Mobile responsive layout  
- Filtering and sorting for exercises  
- Cloud-based database (Firestore, Supabase)  
- User authentication  
- Optional AI-powered workout suggestions  
  - Smart progression tracking  
  - Personalized training recommendations  
  - Automated workout planning
