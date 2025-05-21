import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { useTaskContext } from '../context/TaskContext';

const TaskList = () => {
  const { fetchTasks, filteredTasks, loading, filter, setFilter } = useTaskContext();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <h3>Loading tasks...</h3>;
  }

  return (
    <div className="task-list">
      <div className="filter-container">
        <h3>Your Tasks</h3>
        <div>
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-btn ${filter === 'incomplete' ? 'active' : ''}`} 
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </button>
          <button 
            className={`filter-btn ${filter === 'favorites' ? 'active' : ''}`} 
            onClick={() => setFilter('favorites')}
          >
            Favorites
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-list">
          <h3>No tasks to show</h3>
          <p>Add a new task or change your filter</p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;