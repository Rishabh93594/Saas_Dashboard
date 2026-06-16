# 🏆 Tournament & SaaS Match Dashboard

A premium, interactive SaaS dashboard for national football team analytics, live matches tracking, and player statistics. Built with a responsive, glassmorphic UI using React 19, TypeScript, Express, and MongoDB.

---

## 🚀 Key Features

*   **📊 Live Match Dashboard**: Visual metrics showing registered teams, match stages, total matches, and groups. Includes an interactive chart displaying revenue, audience velocity, and match statistics.
*   **📋 Match Kanban Board**: Interactive, drag-and-drop workflow board for organizing matches by their status (Scheduled, Live, Completed) utilizing `@dnd-kit`.
*   **👥 Tournament Teams Hub**: Analytics on participating squads (e.g., Argentina, France, Morocco, Croatia), tracking wins, draws, losses, goals, performance ratings, and custom-styled squad compositions.
*   **🎨 Dynamic Player Avatars**: Procedurally generated, custom vector avatars based on player names, matching their national kit and team colors.
*   **⚡ Player Analytics & Fixtures**: A dedicated interface showing the Golden Boot Standings race, tournament history, and key performance analytics.
*   **🌙 Dynamic Theming**: Sleek, theme-aware glassmorphic design supporting light/dark mode variations seamlessly.

---

## 🛠️ Technology Stack

### Frontend
*   **React 19** & **Vite** (Next-gen bundling)
*   **TypeScript** (Robust type safety)
*   **Framer Motion** (Smooth, immersive transitions and micro-animations)
*   **Lucide React** (Vector icons)
*   **Chart.js** & **React ChartJS 2** (Interactive analytics graphs)
*   **@dnd-kit/core** & **@dnd-kit/sortable** (Drag-and-drop interfaces)

### Backend
*   **Node.js** & **Express**
*   **MongoDB** & **Mongoose** (ODM)
*   **Nodemon** (Local hot-reloading)
*   **Dotenv** & **CORS**

---

## 📁 Project Directory Structure

```
dashboard/
├── backend/                  # Node.js + Express API server
│   ├── models/               # Mongoose schemas (e.g., Match)
│   ├── routes/               # API endpoints (e.g., matchRoutes)
│   ├── seed.js               # Initial database seeder script
│   ├── server.js             # Main server entrypoint
│   └── package.json
│
├── frontend/                 # React SPA application
│   ├── public/               # Public assets (logos, flags)
│   ├── src/
│   │   ├── assets/           # Visual resources
│   │   ├── components/       # Reusable components (e.g., PlayerAvatar, OrdersKanban)
│   │   ├── data/             # Static configurations & players records
│   │   ├── App.tsx           # Primary routing & component mounting
│   │   ├── main.tsx          # Client bundle setup
│   │   └── Projects.tsx      # Team analytics screen
│   └── package.json
```

---

## ⚙️ Getting Started & Local Setup

Follow these steps to run the application locally on your system.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas connection string)

---

### 1. Setup Backend Server

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file in the `backend/` directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    ```
4.  Seed the database:
    Populate MongoDB with default matches:
    ```bash
    node seed.js
    ```
5.  Start the dev server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

---

### 2. Setup Frontend Application

1.  Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your web browser to access the dashboard!

---

## 🛠️ Development & Type Safety

*   **Type Checking**: Check TS files for compiling issues before commits:
    ```bash
    npx tsc --noEmit -p tsconfig.app.json
    ```
*   **Linting**: Run the linter to verify formatting standards:
    ```bash
    npm run lint
    ```
