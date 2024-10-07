import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data); // Set the tasks fetched from the backend
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4000/tasks',
        { title: newTaskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]); // Add the newly created task to the list
      setNewTaskTitle('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove the deleted task from the list
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <form onSubmit={handleCreateTask} className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter a new task"
          required
        />
        <button type="submit" className="mt-2 w-full bg-blue-600 text-white py-2 rounded">
          Add Task
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;