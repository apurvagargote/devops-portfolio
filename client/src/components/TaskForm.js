import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please add a task title');
      return;
    }
    
    const newTask = {
      title,
      description,
      completed: false,
      favorite: false
    };
    
    addTask(newTask);
    
    // Clear form
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Task Title"
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Task Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Task Description (optional)"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-block">Add Task</button>
    </form>
  );
};

export default TaskForm;