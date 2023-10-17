import { Droppable, Draggable } from '@hello-pangea/dnd'
import TaskItem from './TaskItem'

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

function TaskColumn({ id, title, color, tasks, onToggleComplete }) {
  return (
    <div className={`rounded-lg border-2 ${colorClasses[color]} p-4 min-h-[300px]`}>
      <h2 className={`font-semibold text-lg mb-4 px-3 py-1 rounded ${headerColors[color]} inline-block`}>
        {title}
        <span className="ml-2 text-sm opacity-75">({tasks.length})</span>
      </h2>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[200px] transition-colors rounded-lg p-2 ${
              snapshot.isDraggingOver ? 'bg-white/50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                  >
                    <TaskItem 
                      task={task} 
                      onToggleComplete={onToggleComplete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TaskColumn