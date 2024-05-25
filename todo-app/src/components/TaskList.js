import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    console.log(`Deleted task with ID: ${id}`);
    fetchTasks();
  };

  return (
    <div className="box">
      <h1>Task List</h1>
      <Link to="/task/new">
        <button className="button-secondary">Create New Task</button>
      </Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title} - {task.status} - {task.dueDate}</span>
            <div>
              <Link to={`/task/edit/${task.id}`}>
                <button className="button-secondary">Edit</button>
              </Link>
              <button className="button-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
            <div>
              {console.log(`Displayed task: ${JSON.stringify(task)}`)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
