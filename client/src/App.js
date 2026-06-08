import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  
  // Auth form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  // Task states
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  
  // Message state
  const [message, setMessage] = useState('');

  // Load tasks when logged in
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchTasks();
    }
  }, [isLoggedIn, token]);

  const showMessage = (msg, isError = true) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Register or Login
  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(endpoint, payload);
      if (isLogin) {
        setToken(res.data.token);
        setUser(res.data.user);
        setIsLoggedIn(true);
        localStorage.setItem('token', res.data.token);
        showMessage('Login successful!', false);
      } else {
        showMessage('Registration successful! Please login.', false);
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      showMessage(err.response?.data?.error || 'Authentication failed');
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    setUser(null);
    setTasks([]);
    localStorage.removeItem('token');
    showMessage('Logged out', false);
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks);
    } catch (err) {
      showMessage('Failed to fetch tasks');
    }
  };

  // Create task
  const createTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) return showMessage('Title required');
    
    try {
      await axios.post(`${API_URL}/tasks`, {
        title: taskTitle,
        description: taskDesc,
        status: 'pending'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTaskTitle('');
      setTaskDesc('');
      fetchTasks();
      showMessage('Task created!', false);
    } catch (err) {
      showMessage('Failed to create task');
    }
  };

  // Update task
  const updateTask = async () => {
    try {
      await axios.put(`${API_URL}/tasks/${editingTask.id}`, {
        title: taskTitle,
        description: taskDesc
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingTask(null);
      setTaskTitle('');
      setTaskDesc('');
      fetchTasks();
      showMessage('Task updated!', false);
    } catch (err) {
      showMessage('Failed to update task');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
      showMessage('Task deleted!', false);
    } catch (err) {
      showMessage('Failed to delete task');
    }
  };

  // Edit button click
  const editTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDesc(task.description || '');
  };

  // If not logged in, show auth form
  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'Arial' }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {message && <div style={{ padding: '10px', background: '#ffcccc', marginBottom: '10px' }}>{message}</div>}
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
          <button type="submit" style={{ width: '100%', padding: '10px', margin: '10px 0', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={{ width: '100%', padding: '10px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    );
  }

  // Logged in view
  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <div>
          <h2>Task Manager</h2>
          <p>Welcome, {user?.name} ({user?.role})</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
      </div>

      {message && <div style={{ padding: '10px', background: '#d4edda', margin: '10px 0' }}>{message}</div>}

      {/* Task Form */}
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd' }}>
        <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
        <textarea
          placeholder="Description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0', minHeight: '60px' }}
        />
        <button
          onClick={editingTask ? updateTask : createTask}
          style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {editingTask ? 'Update' : 'Create'}
        </button>
        {editingTask && (
          <button
            onClick={() => { setEditingTask(null); setTaskTitle(''); setTaskDesc(''); }}
            style={{ padding: '8px 16px', marginLeft: '10px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div>
        <h3>Your Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create one above!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{task.title}</h4>
                  <p style={{ margin: '5px 0', color: '#666' }}>{task.description || 'No description'}</p>
                  <small>Status: {task.status} | Created: {new Date(task.created_at).toLocaleDateString()}</small>
                </div>
                <div>
                  <button onClick={() => editTask(task)} style={{ padding: '5px 10px', marginRight: '5px', background: '#ffc107', border: 'none', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => deleteTask(task.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;