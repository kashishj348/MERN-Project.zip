const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with Demo Fallback
// This fails gracefully if MongoDB is not installed locally so the demo won't crash!
let isMongoConnected = false;
mongoose.connect('mongodb://127.0.0.1:27017/sir_project', { 
  serverSelectionTimeoutMS: 2000 
})
.then(() => { 
  isMongoConnected = true; 
  console.log('MongoDB successfully connected!'); 
})
.catch(err => { 
  console.log('MongoDB connection failed. Using in-memory fallback for the demo presentation.'); 
});

// Mongoose Model representing a "Project Task"
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

// In-Memory Fallback Data
let memoryProjects = [
  { _id: '1', title: 'React UI Design', description: 'Implemented the beautiful animated landing page with routing.', status: 'Completed', createdAt: new Date() },
  { _id: '2', title: 'Backend API & MongoDB', description: 'Express server with MongoDB integration and models.', status: 'Active', createdAt: new Date() }
];

// Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', dbConnected: isMongoConnected, timestamp: new Date() });
});

// Get Projects List (Read)
app.get('/api/projects', async (req, res) => {
  if (isMongoConnected) {
    try {
      const projects = await Project.find().sort('-createdAt');
      res.json(projects);
    } catch(e) { res.status(500).json({error: e.message}) }
  } else {
    res.json(memoryProjects);
  }
});

// Create New Project Item (Create)
app.post('/api/projects', async (req, res) => {
  const { title, description, status } = req.body;
  if (isMongoConnected) {
    try {
      const newProject = new Project({ title, description, status });
      await newProject.save();
      res.json(newProject);
    } catch(e) { res.status(500).json({error: e.message}) }
  } else {
    const newProject = { 
      _id: Date.now().toString(), 
      title, 
      description, 
      status: status || 'Active',
      createdAt: new Date() 
    };
    memoryProjects.unshift(newProject);
    res.json(newProject);
  }
});

// Serve static files from the React frontend build
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the React index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Artificially keep event loop alive to prevent Windows PS environment exiting prematurely
setInterval(() => {}, 3600000);
