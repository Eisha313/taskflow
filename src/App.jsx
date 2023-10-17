import { DragDropContext } from '@hello-pangea/dnd'
import { useSelector, useDispatch } from 'react-redux'
import { moveTask, toggleComplete } from './store/taskSlice'
import TaskColumn from './components/TaskColumn'
import ProgressBar from './components/ProgressBar'
import AddTaskForm from './components/AddTaskForm'

function App() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.items)

  const columns = [
    { id: 'urgent', title: 'Urgent', color: 'red' },
    { id: 'important', title: 'Important', color: 'yellow' },
    { id: 'later', title: 'Later', color: 'blue' }
  ]

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    dispatch(moveTask({
      taskId: draggableId,
      sourcePriority: source.droppableId,
      destinationPriority: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    }))
  }

  const handleToggleComplete = (taskId) => {
    dispatch(toggleComplete(taskId))
  }

  const getTasksByPriority = (priority) => {
    return tasks.filter(task => task.priority === priority)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          TaskFlow
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Organize your day with drag-and-drop prioritization
        </p>
        
        <ProgressBar tasks={tasks} />
        
        <AddTaskForm />
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {columns.map(column => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                color={column.color}
                tasks={getTasksByPriority(column.id)}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default App