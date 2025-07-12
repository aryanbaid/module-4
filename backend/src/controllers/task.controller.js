const Task = require('../models/task');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { userId, title, description, status } = req.body;

    const newTask = new Task({
      userId,
      title,
      description,
      status: status || 'pending', // default to 'pending' if not given
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true }); 

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" }); 
    }

    res.status(200).json(updatedTask); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

// DELETE a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedTask = await Task.findByIdAndDelete(id); 

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" }); 
    }

    res.status(200).json({ message: "Task deleted successfully" }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask, 
};
