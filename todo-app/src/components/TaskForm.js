import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        const { title, description, status, dueDate } = response.data;
        setTitle(title);
        setDescription(description);
        setStatus(status);
        setDueDate(dueDate);
        console.log(`Fetched task: ${JSON.stringify(response.data)}`);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, status, dueDate };
    if (id) {
      await axios.put(`http://localhost:5000/tasks/${id}`, task);
      console.log(`Updated task: ${JSON.stringify(task)}`);
    } else {
      await axios.post('http://localhost:5000/tasks', task);
      console.log(`Created new task: ${JSON.stringify(task)}`);
    }
    fetchTasks();
    navigate('/');
  };

  return (
    <div className="box">
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TaskForm;
