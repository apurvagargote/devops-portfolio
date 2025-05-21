import React, { createContext, useReducer, useContext } from 'react';
import { toast } from 'react-toastify';
import * as taskService from '../api/taskService';

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all' // 'all', 'completed', 'incomplete', 'favorites'
};

// Create context
const TaskContext = createContext(initialState);

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'GET_TASKS':
      return {
        ...state,
        loading: false,
        tasks: action.payload
      };
    case 'ADD_TASK':
      return {
        ...state,
        loading: false,
        tasks: [action.payload, ...state.tasks]
      };
    case 'DELETE_TASK':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task => 
          task._id === action.payload._id ? action.payload : task
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Actions
  const fetchTasks = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await taskService.getTasks();
      dispatch({
        type: 'GET_TASKS',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.error || 'Error fetching tasks'
      });
      toast.error('Failed to fetch tasks');
    }
  };

  const addTask = async (task) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await taskService.createTask(task);
      dispatch({
        type: 'ADD_TASK',
        payload: response.data
      });
      toast.success('Task added successfully');
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.error || 'Error adding task'
      });
      toast.error('Failed to add task');
    }
  };

  const removeTask = async (id) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      await taskService.deleteTask(id);
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
      toast.success('Task deleted successfully');
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.error || 'Error deleting task'
      });
      toast.error('Failed to delete task');
    }
  };

  const updateTask = async (id, taskData) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await taskService.updateTask(id, taskData);
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.data
      });
      toast.success('Task updated successfully');
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.error || 'Error updating task'
      });
      toast.error('Failed to update task');
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await taskService.toggleTaskComplete(id);
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.error || 'Error toggling task completion'
      });
      toast.error('Failed to update task status');
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const response = await taskService.toggleTaskFavorite(id);
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.error || 'Error toggling task favorite'
      });
      toast.error('Failed to update favorite status');
    }
  };

  const setFilter = (filter) => {
    dispatch({
      type: 'SET_FILTER',
      payload: filter
    });
  };

  // Get filtered tasks
  const getFilteredTasks = () => {
    switch (state.filter) {
      case 'completed':
        return state.tasks.filter(task => task.completed);
      case 'incomplete':
        return state.tasks.filter(task => !task.completed);
      case 'favorites':
        return state.tasks.filter(task => task.favorite);
      default:
        return state.tasks;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        filter: state.filter,
        filteredTasks: getFilteredTasks(),
        fetchTasks,
        addTask,
        removeTask,
        updateTask,
        toggleComplete,
        toggleFavorite,
        setFilter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTaskContext = () => useContext(TaskContext);