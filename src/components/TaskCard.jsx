import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTask } from '../store/taskSlice';
import { DragDropContext } from '../context/DragDropContext';

const priorityColors = {
  urgent: 'border-l-red-500 bg-red-50 hover:bg-red-100',
  important: 'border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100',
  later: 'border-l-blue-500 bg-blue-50 hover:bg-blue-100'
};

const checkboxColors = {
  urgent: 'text-red-500 focus:ring-red-500',
  important: 'text-yellow-500 focus:ring-yellow-500',
  later: 'text-blue-500 focus:ring-blue-500'
};

export default function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();
  const { setDraggedTask } = useContext(DragDropContext);

  const handleDragStart = (e) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('opacity-50', 'scale-95');
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
    e.target.classList.remove('opacity-50', 'scale-95');
  };

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        p-3 rounded-lg border-l-4 cursor-grab active:cursor-grabbing
        transition-all duration-200 ease-in-out
        transform hover:scale-[1.02] hover:shadow-md
        ${priorityColors[task.priority]}
        ${task.completed ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className={`
            mt-1 h-4 w-4 rounded border-gray-300
            transition-colors duration-150
            ${checkboxColors[task.priority]}
          `}
        />
        <div className="flex-1 min-w-0">
          <h4
            className={`
              font-medium text-gray-800 truncate
              transition-all duration-200
              ${task.completed ? 'line-through text-gray-500' : ''}
            `}
          >
            {task.title}
          </h4>
          {task.description && (
            <p
              className={`
                text-sm text-gray-600 mt-1 line-clamp-2
                transition-all duration-200
                ${task.completed ? 'line-through text-gray-400' : ''}
              `}
            >
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="
              p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-100
              rounded-md transition-all duration-150
            "
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="
              p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-100
              rounded-md transition-all duration-150
            "
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}