import React from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTaskContext } from './context/TaskContext';

function App() {
  const { error } = useTaskContext();

  return (
    <div>
      <Header />
      <div className="container">
        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;