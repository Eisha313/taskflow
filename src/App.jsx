import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import TaskColumn from './components/TaskColumn'

const COLUMNS = [
  { id: 'urgent', title: 'Urgent', color: 'red' },
  { id: 'important', title: 'Important', color: 'yellow' },
  { id: 'later', title: 'Later', color: 'blue' }
]

function App() {
  const tasks = useSelector((state) => state.tasks.items)

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-gray-500 text-sm">Drag and drop to prioritize your tasks</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                color={column.color}
                tasks={getTasksByPriority(column.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </DndProvider>
  )
}

export default App