import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { moveTask } from '../store/taskSlice'
import TaskCard from './TaskCard'

const colorClasses = {
  red: 'border-red-400 bg-red-50',
  yellow: 'border-yellow-400 bg-yellow-50',
  blue: 'border-blue-400 bg-blue-50'
}

const headerColors = {
  red: 'text-red-700 bg-red-100',
  yellow: 'text-yellow-700 bg-yellow-100',
  blue: 'text-blue-700 bg-blue-100'
}

export default function TaskColumn({ id, title, color, tasks }) {
  const dispatch = useDispatch()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      if (item.priority !== id) {
        dispatch(moveTask({ taskId: item.id, newPriority: id }))
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [id, dispatch])

  const isActive = isOver && canDrop

  return (
    <div
      ref={drop}
      className={`rounded-lg border-2 p-4 min-h-[400px] transition-all duration-200 ${
        colorClasses[color]
      } ${isActive ? 'ring-2 ring-offset-2 ring-gray-400 scale-[1.02]' : ''}`}
    >
      <div className={`rounded-md px-3 py-2 mb-4 ${headerColors[color]}`}>
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="text-sm opacity-75">{tasks.length} tasks</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <p>Drop tasks here</p>
        </div>
      )}
    </div>
  )
}