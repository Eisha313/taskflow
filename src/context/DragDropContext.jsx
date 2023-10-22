import React, { createContext, useContext, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { moveTask } from '../store/taskSlice';

const DragDropContext = createContext(null);

export function DragDropProvider({ children }) {
  const dispatch = useDispatch();
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = useCallback((task) => {
    setDraggedTask(task);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDragOverColumn(null);
  }, []);

  const handleDragOver = useCallback((columnId) => {
    setDragOverColumn(columnId);
  }, []);

  const handleDrop = useCallback((targetColumn) => {
    if (draggedTask && draggedTask.priority !== targetColumn) {
      dispatch(moveTask({
        taskId: draggedTask.id,
        newPriority: targetColumn
      }));
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  }, [draggedTask, dispatch]);

  const value = {
    draggedTask,
    dragOverColumn,
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
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}

export default DragDropContext;