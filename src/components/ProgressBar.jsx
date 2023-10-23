import { useSelector } from 'react-redux';
import { selectAllTasks } from '../store/taskSlice';

const ProgressBar = () => {
  const tasks = useSelector(selectAllTasks);
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  
  const getProgressColor = () => {
    if (progressPercentage < 33) return 'bg-red-500';
    if (progressPercentage < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getMotivationalText = () => {
    if (totalTasks === 0) return 'Add some tasks to get started!';
    if (progressPercentage === 0) return 'Let\'s get started! 💪';
    if (progressPercentage < 25) return 'Great start! Keep going!';
    if (progressPercentage < 50) return 'Making progress! 🚀';
    if (progressPercentage < 75) return 'More than halfway there! 🎯';
    if (progressPercentage < 100) return 'Almost done! You got this! 🔥';
    return 'All tasks completed! Amazing! 🎉';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Daily Progress</h2>
          <span className="text-2xl font-bold text-gray-800">{progressPercentage}%</span>
        </div>
        
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full ${getProgressColor()} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-500">
            {completedTasks} of {totalTasks} tasks completed
          </p>
          <p className="text-sm font-medium text-gray-600 animate-pulse">
            {getMotivationalText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;