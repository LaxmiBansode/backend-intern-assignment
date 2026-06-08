const db = require('../config/database');

// Get all tasks (for logged in user)
exports.getTasks = async (req, res) => {
  try {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    let params = [req.user.id];
    
    // Admin can see all tasks
    if (req.user.role === 'admin') {
      query = 'SELECT * FROM tasks';
      params = [];
    }
    
    const [tasks] = await db.query(query, params);
    res.json({ tasks });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get single task
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    let query = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
    let params = [id, req.user.id];
    
    if (req.user.role === 'admin') {
      query = 'SELECT * FROM tasks WHERE id = ?';
      params = [id];
    }
    
    const [tasks] = await db.query(query, params);
    
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ task: tasks[0] });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [title, description || '', status || 'pending', req.user.id]
    );
    
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    
    res.status(201).json({ 
      message: 'Task created successfully',
      task: newTask[0]
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  
  try {
    // Check if task exists and belongs to user
    let checkQuery = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
    let checkParams = [id, req.user.id];
    
    if (req.user.role === 'admin') {
      checkQuery = 'SELECT * FROM tasks WHERE id = ?';
      checkParams = [id];
    }
    
    const [existing] = await db.query(checkQuery, checkParams);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Update task
    const updates = [];
    const values = [];
    
    if (title) {
      updates.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (status) {
      updates.push('status = ?');
      values.push(status);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    await db.query(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);
    
    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    
    res.json({ 
      message: 'Task updated successfully',
      task: updated[0]
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  
  try {
    let deleteQuery = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
    let deleteParams = [id, req.user.id];
    
    if (req.user.role === 'admin') {
      deleteQuery = 'DELETE FROM tasks WHERE id = ?';
      deleteParams = [id];
    }
    
    const [result] = await db.query(deleteQuery, deleteParams);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};