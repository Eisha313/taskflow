import { Provider } from 'react-redux';
import { store } from './store/taskSlice';
import { DragDropProvider } from './context/DragDropContext';
import TaskColumn from './components/TaskColumn';
import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <Provider store={store}>
      <DragDropProvider>
        <div className="min-h-screen py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">TaskFlow</h1>
            <p className="text-gray-600">Organize your day with drag-and-drop simplicity</p>
          </header>
          
          <ProgressBar />
          
          <main className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <TaskColumn 
                priority="urgent" 
                title="🔴 Urgent" 
                color="red"
              />
              <TaskColumn 
                priority="important" 
                title="🟡 Important" 
                color="yellow"
              />
              <TaskColumn 
                priority="later" 
                title="🟢 Later" 
                color="green"
              />
            </div>
          </main>
          
          <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Drag tasks between columns to prioritize</p>
          </footer>
        </div>
      </DragDropProvider>
    </Provider>
  );
}

export default App;