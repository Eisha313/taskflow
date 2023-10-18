import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, toggleComplete } from '../store/taskSlice';

function TaskCard({ task, isDragging }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch(editTask({ id: task.id, title: editedTitle.trim() }));
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-2 transition-all duration-200 ${
        isDragging ? 'shadow-lg scale-105 rotate-2' : 'hover:shadow-md'
      } ${task.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-2">
        <button
          onClick={handleToggleComplete}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {task.completed && (
            <svg
              className="w-full h-full text-white p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <p
              className={`text-sm text-gray-800 break-words ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {task.createdAt && (
        <p className="text-xs text-gray-400 mt-2 pl-7">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default TaskCard;