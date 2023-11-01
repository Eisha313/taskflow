import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, toggleComplete } from '../store/taskSlice';
import { useDragDrop } from '../context/DragDropContext';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { handleDragStart, handleDragEnd, draggedTask } = useDragDrop();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef(null);

  const isDragging = draggedTask?.id === task.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Sync edit title when task changes
  useEffect(() => {
    if (!isEditing) {
      setEditTitle(task.title);
    }
  }, [task.title, isEditing]);

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleComplete(task.id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (!task.completed) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle && trimmedTitle !== task.title) {
      dispatch(editTask({ id: task.id, title: trimmedTitle }));
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const onDragStart = (e) => {
    if (isEditing) {
      e.preventDefault();
      return;
    }
    handleDragStart(task, e);
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      className={`
        group bg-white rounded-lg shadow-sm border border-gray-200 p-3
        transition-all duration-200 cursor-grab active:cursor-grabbing
        hover:shadow-md hover:border-gray-300
        ${isDragging ? 'opacity-50 scale-95 rotate-2' : ''}
        ${task.completed ? 'bg-gray-50 opacity-75' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={handleToggleComplete}
          className={`
            flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 
            transition-all duration-200 flex items-center justify-center
            ${task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
            }
          `}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
            />
          ) : (
            <p
              onDoubleClick={handleDoubleClick}
              className={`
                text-sm text-gray-700 break-words
                ${task.completed ? 'line-through text-gray-400' : ''}
              `}
              title="Double-click to edit"
            >
              {task.title}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="
            flex-shrink-0 opacity-0 group-hover:opacity-100
            text-gray-400 hover:text-red-500 transition-all duration-200
            p-1 rounded hover:bg-red-50
          "
          aria-label="Delete task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
