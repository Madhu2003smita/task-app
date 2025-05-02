import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Addtaskbutton({ onTaskAdded, setShowForm, singleTask }) {
  const [task, setTask] = useState({ title: '', description: '', priority: '', due_date: '' });

  useEffect(() => {
    if (singleTask) {
      // Convert due_date to "YYYY-MM-DD" format for input field
      const formattedTask = {
        ...singleTask,
        due_date: singleTask.due_date ? singleTask.due_date.slice(0, 10) : '',
      };
      setTask(formattedTask);
    }
  }, [singleTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEdit = !!singleTask?.task_id;
      const res = isEdit
        ? await api.put(`/task/${singleTask.task_id}`, task)
        : await api.post('/task', task);

      alert(res.data.message || (isEdit ? 'Task updated' : 'Task added'));
      setTask({ title: '', description: '', priority: '', due_date: '' });
      onTaskAdded?.();
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert('Failed to submit task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-xl w-full max-w-md shadow-lg">
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow"
          title="Close"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">
            {singleTask?.task_id ? 'Edit Task' : 'Add Task'}
          </h3>

          <label className="block mb-1 text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block mb-1 text-gray-700 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block mb-1 text-gray-700 font-medium">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block mb-1 text-gray-700 font-medium">Priority</label>
          <div className="flex gap-4 mb-6">
            {['high', 'moderate', 'low'].map((level) => (
              <label key={level} className="flex items-center gap-1 capitalize">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  onChange={handleChange}
                  checked={task.priority === level}
                  className="accent-blue-600"
                />
                {level}
              </label>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {singleTask?.task_id ? 'Update' : 'Add'}
            </button>

            <button
              type="button"
              onClick={() => setTask({ title: '', description: '', priority: '', due_date: '' })}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addtaskbutton;



