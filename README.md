# Premium MERN Stack Application

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

A modern, full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js), featuring a stunning UI and robust cloud-native architecture. 

## ✨ Key Features
- **Modern Glassmorphism UI**: High-end user interface built using vanilla CSS with dynamic glassmorphism tokens, CSS animations, and gradient text rendering.
- **Multi-page Architecture**: Client-side routing flawlessly navigated using `react-router-dom`.
- **Intelligent Database Fallback**: Integrated MongoDB (Mongoose) connection with a built-in safety fallback mechanism. When run on a machine without a local MongoDB database active, the Express server gracefully switches to an in-memory simulation to guarantee 100% uptime for local execution and presentations.
- **RESTful API**: Standardized backend architecture utilizing Express serving `/api` routes over proxy cross-origin sharing.
- **Monolithic Deployment**: Azure optimized deployment configuration.

## 🚀 Getting Started Locally

### 1. Installation
Clone the repository, then install dependencies for both the frontend and backend:
```bash
# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Development Servers
To run the project locally, start up the backend server first, followed by the Vite frontend server:

**Terminal 1 (Backend)**:
```bash
cd backend
node index.js
```
*The backend server will run on `http://localhost:5050`.*

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm run dev
```
*The React client will be available at `http://localhost:5173`. Any API queries will securely proxy to the backend!*

---
*Developed with a focus on seamless integration, state-of-the-art aesthetics, and bulletproof runtime stability.*
