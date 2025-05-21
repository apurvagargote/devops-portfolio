import React from 'react';
import { FaTrash, FaStar, FaRegStar, FaCheck, FaTimes } from 'react-icons/fa';
import { useTaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { removeTask, toggleComplete, toggleFavorite } = useTaskContext();

  return (
    <div className={`task ${task.completed ? 'task-complete' : ''}`}>
      <h3>
        {task.title}
        <div className="task-actions">
          <button 
            onClick={() => toggleFavorite(task._id)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
          >
            {task.favorite ? (
              <FaStar style={{ color: '#f39c12' }} />
            ) : (
              <FaRegStar />
            )}
          </button>
          <button 
            onClick={() => toggleComplete(task._id)} 
            style={{ 
              background: task.completed ? '#e74c3c' : '#2ecc71', 
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {task.completed ? <FaTimes /> : <FaCheck />}
          </button>
          <button 
            onClick={() => removeTask(task._id)} 
            style={{ 
              background: '#e74c3c', 
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <FaTrash />
          </button>
        </div>
      </h3>
      {task.description && <p>{task.description}</p>}
      <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '10px' }}>
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskItem;