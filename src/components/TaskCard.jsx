import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { toggleComplete, deleteTask } from '../store/taskSlice'

export default function TaskCard({ task }) {
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, priority: task.priority },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [task.id, task.priority])

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id))
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow-sm p-3 cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95 rotate-2' : 'opacity-100'
      } ${task.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium text-gray-900 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-gray-500 mt-1 truncate">
              {task.description}
            </p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}