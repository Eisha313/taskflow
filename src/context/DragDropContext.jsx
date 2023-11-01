import React, { createContext, useContext, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { reorderTasks } from '../store/taskSlice';

const DragDropContext = createContext(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};

export const DragDropProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);

  const handleDragStart = useCallback((task, e) => {
    if (!task || !task.id) return;
    
    setDraggedTask(task);
    if (e?.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', task.id);
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDragOverColumn(null);
    setDropIndex(null);
  }, []);

  const handleDragOver = useCallback((priority, index, e) => {
    if (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
    setDragOverColumn(priority);
    if (typeof index === 'number' && index >= 0) {
      setDropIndex(index);
    }
  }, []);

  const handleDrop = useCallback((newPriority, newIndex = 0) => {
    if (!draggedTask || !draggedTask.id) {
      handleDragEnd();
      return;
    }
    
    if (!['urgent', 'important', 'later'].includes(newPriority)) {
      handleDragEnd();
      return;
    }

    const finalIndex = typeof newIndex === 'number' && newIndex >= 0 ? newIndex : 0;

    dispatch(reorderTasks({
      taskId: draggedTask.id,
      newPriority,
      newIndex: finalIndex
    }));

    handleDragEnd();
  }, [draggedTask, dispatch, handleDragEnd]);

  const value = {
    draggedTask,
    dragOverColumn,
    dropIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDropContext;
