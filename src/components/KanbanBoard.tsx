import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTaskStatus, Task } from '../store/slices/tasksSlice';
import { setActiveModal } from '../store/slices/uiSlice';
import { Plus, Calendar, User } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.teams);
  const { projects } = useSelector((state: RootState) => state.projects);

  const columns = [
    { id: 'new', title: 'New', color: 'bg-gray-100 dark:bg-gray-700' },
    { id: 'scheduled', title: 'Scheduled', color: 'bg-blue-100 dark:bg-blue-900/20' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100 dark:bg-green-900/20' },
    { id: 'blocked', title: 'Blocked', color: 'bg-red-100 dark:bg-red-900/20' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.avatar || '';
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string, currentStatus: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('currentStatus', currentStatus);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const currentStatus = e.dataTransfer.getData('currentStatus');
    
    if (taskId && currentStatus !== newStatus) {
      dispatch(updateTaskStatus({ id: taskId, status: newStatus as Task['status'] }));
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-6">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80"
        >
          <div className={`rounded-lg p-4 ${column.color}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {column.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getTasksByStatus(column.id).length}
                </span>
                <button
                  onClick={() => dispatch(setActiveModal('task-modal'))}
                  className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            <div
              className="space-y-3 min-h-[400px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {getTasksByStatus(column.id).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, task.status)}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-l-4 ${getPriorityColor(task.priority)} cursor-move hover:shadow-md transition-shadow`}
                >
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full ${
                      task.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={getUserAvatar(task.assigneeId)}
                        alt={getUserName(task.assigneeId)}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {getUserName(task.assigneeId)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {getProjectName(task.projectId)}
                    </span>
                  </div>
                  
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {task.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          +{task.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};