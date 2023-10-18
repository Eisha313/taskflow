import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  columns: {
    urgent: {
      id: 'urgent',
      title: 'Urgent',
      taskIds: [],
      color: 'red'
    },
    important: {
      id: 'important',
      title: 'Important',
      taskIds: [],
      color: 'yellow'
    },
    later: {
      id: 'later',
      title: 'Later',
      taskIds: [],
      color: 'blue'
    }
  },
  columnOrder: ['urgent', 'important', 'later']
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, columnId } = action.payload;
      const newTask = {
        id: `task-${Date.now()}`,
        title,
        completed: false,
        createdAt: new Date().toISOString()
      };
      state.tasks.push(newTask);
      state.columns[columnId].taskIds.push(newTask.id);
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.title = title;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(t => t.id !== taskId);
      Object.values(state.columns).forEach(column => {
        column.taskIds = column.taskIds.filter(id => id !== taskId);
      });
    },
    toggleComplete: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    moveTask: (state, action) => {
      const { taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      
      // Remove from source column
      state.columns[sourceColumnId].taskIds.splice(sourceIndex, 1);
      
      // Add to destination column
      state.columns[destinationColumnId].taskIds.splice(destinationIndex, 0, taskId);
    },
    reorderTask: (state, action) => {
      const { columnId, sourceIndex, destinationIndex } = action.payload;
      const column = state.columns[columnId];
      const [removed] = column.taskIds.splice(sourceIndex, 1);
      column.taskIds.splice(destinationIndex, 0, removed);
    }
  }
});

export const { addTask, editTask, deleteTask, toggleComplete, moveTask, reorderTask } = taskSlice.actions;

// Selectors
export const selectTasksByColumn = (state, columnId) => {
  const column = state.tasks.columns[columnId];
  return column.taskIds.map(taskId => 
    state.tasks.tasks.find(task => task.id === taskId)
  ).filter(Boolean);
};

export const selectAllTasks = (state) => state.tasks.tasks;

export const selectCompletionPercentage = (state) => {
  const tasks = state.tasks.tasks;
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
};

export default taskSlice.reducer;