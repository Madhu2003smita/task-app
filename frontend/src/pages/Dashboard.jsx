import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/api';
import Addtaskbutton from '../components/Addtaskbutton';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [singleTask, setSingleTask] = useState();
  const navigate = useNavigate(); 

  const fetchTasks = async () => {
    try {
      const response = await api.get('/task');
      setTasks(response.data.tasks);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
        return;
      }
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [navigate]);

  function appearTask() {
    setShowForm((prev) => !prev);
  }

  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/task/${id}`);
      alert(res.data.message);
      fetchTasks();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
        return;
      }
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const res = await api.patch(`/task/${id}/complete`);
      alert(res.data.message);
      fetchTasks();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
        return;
      }
      console.error('Error toggling completion:', error);
    }
  };

  const fetchData = async (task_id) => {
    try {
      let res = await api.get(`/task/${task_id}`);
      setSingleTask(res.data.task[0]);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
        return;
      }
      console.error('Error fetching task details:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 relative">
      
      {/* Logout Button */}
      <button
        className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="relative max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className='invisible'>placeholder</div>
          <h2 className="text-3xl font-bold text-blue-600">Dashboard</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              appearTask();
              setSingleTask();
            }}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((data) => (
              <li
                key={data.task_id}
                className={`${
                  data.priority === 'high'
                    ? 'bg-red-100'
                    : data.priority === 'moderate'
                    ? 'bg-green-100'
                    : data.priority === 'low'
                    ? 'bg-blue-50'
                    : 'bg-gray-100'
                } p-4 rounded-md border border-blue-200 shadow-sm hover:shadow-md transition`}
              >
                <div className="text-gray-800">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-semibold ${data.completed ? 'line-through text-gray-500' : ''}`}>
                      {data.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => toggleComplete(data.task_id)}
                        title="Toggle complete"
                      >
                        {data.completed ? 'Mark Incomplete' : 'Mark Complete'}
                      </button>
                      <button
                        className="ml-2"
                        onClick={() => {
                          fetchData(data.task_id);
                          appearTask();
                        }}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTask(data.task_id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600"><strong>Description:</strong> {data.description}</p>
                  <p className="mt-1 text-sm text-gray-600"><strong>Due Date:</strong> {data.due_date?.slice(0, 10)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Addtaskbutton
          setShowForm={setShowForm}
          onTaskAdded={fetchTasks}
          singleTask={singleTask}
        />
      )}
    </div>
  );
}

export default Dashboard;
