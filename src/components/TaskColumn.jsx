import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { moveTask } from '../store/taskSlice';
import { DragDropContext } from '../context/DragDropContext';
import TaskCard from './TaskCard';

const columnConfig = {
  urgent: {
    title: '🔥 Urgent',
    headerBg: 'bg-red-500',
    dropBg: 'bg-red-100 border-red-300',
    emptyText: 'No urgent tasks'
  },
  important: {
    title: '⭐ Important',
    headerBg: 'bg-yellow-500',
    dropBg: 'bg-yellow-100 border-yellow-300',
    emptyText: 'No important tasks'
  },
  later: {
    title: '📋 Later',
    headerBg: 'bg-blue-500',
    dropBg: 'bg-blue-100 border-blue-300',
    emptyText: 'No tasks for later'
  }
};

export default function TaskColumn({ priority, tasks, onEditTask }) {
  const dispatch = useDispatch();
  const { draggedTask } = useContext(DragDropContext);
  const [isDragOver, setIsDragOver] = useState(false);

  const config = columnConfig[priority];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (draggedTask && draggedTask.priority !== priority) {
      dispatch(moveTask({ taskId: draggedTask.id, newPriority: priority }));
    }
  };

  return (
    <div
      className={`
        flex flex-col bg-white rounded-xl shadow-sm
        border-2 transition-all duration-300 ease-in-out
        ${isDragOver ? `${config.dropBg} scale-[1.02] shadow-lg` : 'border-gray-100'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`
        ${config.headerBg} text-white px-4 py-3 rounded-t-lg
        font-semibold text-center
      `}>
        <span className="text-lg">{config.title}</span>
        <span className="
          ml-2 bg-white/20 px-2 py-0.5 rounded-full text-sm
          transition-all duration-200
        ">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-1 p-3 space-y-3 min-h-[200px] max-h-[60vh] overflow-y-auto">
        {tasks.length === 0 ? (
          <div className={`
            flex items-center justify-center h-32
            text-gray-400 text-sm italic
            border-2 border-dashed rounded-lg
            transition-all duration-300
            ${isDragOver ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}
          `}>
            {isDragOver ? 'Drop here!' : config.emptyText}
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="group"
                style={{
                  animation: `fadeSlideIn 0.3s ease-out ${index * 0.05}s both`
                }}
              >
                <TaskCard task={task} onEdit={onEditTask} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}