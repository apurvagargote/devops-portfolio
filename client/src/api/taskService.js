import axios from 'axios';

const API_URL = '/api/tasks';

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single task
export const getTask = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update a task
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Toggle task completion status
export const toggleTaskComplete = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle-complete`);
  return response.data;
};

// Toggle task favorite status
export const toggleTaskFavorite = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle-favorite`);
  return response.data;
};