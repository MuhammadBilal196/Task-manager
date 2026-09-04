import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import EditTask from "./pages/EditTask";
import { TaskProvider } from "./context/TaskContext";

const NotFound = () => (
  <div className="page">
    <h1>404 — Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <TaskProvider>
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<AddTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </TaskProvider>
  );
}

export default App;
