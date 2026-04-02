# Azure Deployment Guide for React + Node.js (MERN)

This boilerplate separates the frontend (React using Vite) and the backend (Node using Express).

## 1. Deploying the Backend (App Service)
1. **Prepare App**: Ensure your backend uses `process.env.PORT` which Azure sets dynamically.
2. **Create App Service**: In the Azure Portal, create a new Web App.
   - Publish: Code
   - Runtime stack: Node (LTS)
   - Operating System: Linux
3. **Continuous Deployment (GitHub Actions)**:
   - Connect your GitHub repository under the **Deployment Center** of the Web App.
   - Select your repo and branch; Azure will automatically generate a GitHub Action to deploy your `backend` folder. Note: you may need to update the generated action or set up Kudu if your repository root is not the backend folder itself. It's often easiest to isolate the backend into its own repo or configure the workflow file to specify the path.
4. **Environment Variables**: Add your `MONGO_URI` (from Azure Cosmos DB or MongoDB Atlas) in the App Service Configuration -> Application settings.

## 2. Deploying the Frontend (Static Web Apps)
1. **Azure Static Web Apps (Recommended)**: Create a new Static Web App resource.
2. **Repository setup**: Link your GitHub repo.
3. **Build settings**:
   - Framework: React
   - App Source: `/frontend`
   - Build output location: `dist`
4. The Static Web App service will handle continuous deployment from GitHub automatically.

> **Tip**: If you prefer to deploy them together, you can run `npm run build` in your frontend and configure Express to serve the built static assets from `frontend/dist`. Then deploy the combined repository to Azure App Service as a Node.js application.
