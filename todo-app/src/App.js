import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} fetchTasks={fetchTasks} />} />
          <Route path="/task/new" element={<TaskForm fetchTasks={fetchTasks} />} />
          <Route path="/task/edit/:id" element={<TaskForm fetchTasks={fetchTasks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
