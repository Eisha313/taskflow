import React from 'react';
import { useSelector } from 'react-redux';
import { DragDropProvider } from './context/DragDropContext';
import TaskColumn from './components/TaskColumn';
import { selectCompletionStats } from './store/taskSlice';

const columns = [
  { id: 'urgent', title: 'Urgent', color: 'red' },
  { id: 'important', title: 'Important', color: 'yellow' },
  { id: 'later', title: 'Later', color: 'blue' }
];

function App() {
  const { total, completed, percentage } = useSelector(selectCompletionStats);

  return (
    <DragDropProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              TaskFlow
            </h1>
            <p className="text-gray-600 mb-4">
              Organize your day with priority-based task management
            </p>
            
            {/* Progress Section */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Daily Progress</span>
                <span>{completed} / {total} tasks ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(column => (
              <TaskColumn
                key={column.id}
                columnId={column.id}
                title={column.title}
                color={column.color}
              />
            ))}
          </main>
        </div>
      </div>
    </DragDropProvider>
  );
}

export default App;