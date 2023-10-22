import { createSlice, nanoid } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem('taskflow-tasks');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if tasks are from today
      const today = new Date().toDateString();
      if (parsed.date === today) {
        return parsed.tasks;
      }
    }
  } catch (e) {
    console.error('Failed to load tasks from storage:', e);
  }
  return [];
};

const saveTasksToStorage = (tasks) => {
  try {
    const data = {
      date: new Date().toDateString(),
      tasks
    };
    localStorage.setItem('taskflow-tasks', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save tasks to storage:', e);
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: 'all' // all, active, completed
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        saveTasksToStorage(state.tasks);
      },
      prepare: ({ title, priority = 'later' }) => ({
        payload: {
          id: nanoid(),
          title,
          priority,
          completed: false,
          createdAt: new Date().toISOString()
        }
      })
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.title = title;
        task.updatedAt = new Date().toISOString();
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        saveTasksToStorage(state.tasks);
      }
    },
    moveTask: (state, action) => {
      const { taskId, newPriority } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task && ['urgent', 'important', 'later'].includes(newPriority)) {
        task.priority = newPriority;
        task.updatedAt = new Date().toISOString();
        saveTasksToStorage(state.tasks);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(t => !t.completed);
      saveTasksToStorage(state.tasks);
    },
    resetDailyTasks: (state) => {
      state.tasks = [];
      saveTasksToStorage(state.tasks);
    }
  }
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  moveTask,
  setFilter,
  clearCompleted,
  resetDailyTasks
} = taskSlice.actions;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;

export const selectTasksByPriority = (priority) => (state) =>
  state.tasks.tasks.filter(task => task.priority === priority);

export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks;
  switch (filter) {
    case 'active':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    default:
      return tasks;
  }
};

export const selectCompletionStats = (state) => {
  const tasks = state.tasks.tasks;
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percentage };
};

export default taskSlice.reducer;