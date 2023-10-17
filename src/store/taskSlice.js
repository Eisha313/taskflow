import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: '1', title: 'Review project requirements', priority: 'urgent', completed: false },
    { id: '2', title: 'Update documentation', priority: 'important', completed: false },
    { id: '3', title: 'Refactor utility functions', priority: 'later', completed: true }
  ]
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        priority: action.payload.priority || 'later',
        completed: false
      }
      state.items.push(newTask)
    },
    editTask: (state, action) => {
      const { id, title } = action.payload
      const task = state.items.find(t => t.id === id)
      if (task) {
        task.title = title
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    toggleComplete: (state, action) => {
      const task = state.items.find(t => t.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    moveTask: (state, action) => {
      const { taskId, destinationPriority } = action.payload
      const task = state.items.find(t => t.id === taskId)
      if (task) {
        task.priority = destinationPriority
      }
    }
  }
})

export const { addTask, editTask, deleteTask, toggleComplete, moveTask } = taskSlice.actions
export default taskSlice.reducer