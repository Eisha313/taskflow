import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem('taskflow-tasks');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate stored data structure
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.tasks)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load tasks from storage:', e);
  }
  return {
    tasks: [],
    lastResetDate: new Date().toDateString()
  };
};

const saveTasksToStorage = (state) => {
  try {
    localStorage.setItem('taskflow-tasks', JSON.stringify({
      tasks: state.tasks,
      lastResetDate: state.lastResetDate
    }));
  } catch (e) {
    console.error('Failed to save tasks to storage:', e);
  }
};

const initialState = loadTasksFromStorage();

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: action.payload.title,
        priority: action.payload.priority || 'later',
        completed: false,
        createdAt: new Date().toISOString()
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state);
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task && title && title.trim()) {
        task.title = title.trim();
        saveTasksToStorage(state);
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
        saveTasksToStorage(state);
      }
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state);
      }
    },
    moveTask: (state, action) => {
      const { taskId, newPriority } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task && ['urgent', 'important', 'later'].includes(newPriority)) {
        task.priority = newPriority;
        saveTasksToStorage(state);
      }
    },
    reorderTasks: (state, action) => {
      const { taskId, newPriority, newIndex } = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex === -1) return;
      
      const task = state.tasks[taskIndex];
      const oldPriority = task.priority;
      
      // Remove task from current position
      state.tasks.splice(taskIndex, 1);
      
      // Update priority
      task.priority = newPriority;
      
      // Get tasks in target column
      const tasksInColumn = state.tasks.filter(t => t.priority === newPriority);
      
      // Calculate actual insert index
      const clampedIndex = Math.max(0, Math.min(newIndex, tasksInColumn.length));
      
      if (tasksInColumn.length === 0) {
        state.tasks.push(task);
      } else {
        // Find the position in the main array to insert
        let insertPosition;
        if (clampedIndex >= tasksInColumn.length) {
          // Insert after the last task in this column
          const lastTaskInColumn = tasksInColumn[tasksInColumn.length - 1];
          insertPosition = state.tasks.findIndex(t => t.id === lastTaskInColumn.id) + 1;
        } else {
          // Insert before the task at newIndex
          const targetTask = tasksInColumn[clampedIndex];
          insertPosition = state.tasks.findIndex(t => t.id === targetTask.id);
        }
        state.tasks.splice(insertPosition, 0, task);
      }
      
      saveTasksToStorage(state);
    },
    checkDailyReset: (state) => {
      const today = new Date().toDateString();
      if (state.lastResetDate !== today) {
        // Reset completion status for a new day but keep tasks
        state.tasks.forEach(task => {
          task.completed = false;
        });
        state.lastResetDate = today;
        saveTasksToStorage(state);
      }
    }
  }
});

export const { 
  addTask, 
  editTask, 
  deleteTask, 
  toggleComplete, 
  moveTask,
  reorderTasks,
  checkDailyReset 
} = taskSlice.actions;

export default taskSlice.reducer;
