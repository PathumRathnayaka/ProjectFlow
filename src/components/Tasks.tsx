import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTask, updateTask, deleteTask, updateTaskStatus } from '../store/slices/tasksSlice';
import { setActiveModal, setCurrentView } from '../store/slices/uiSlice';
import { Plus, Search, Filter, Table, Columns, List, Edit, Trash2, Calendar, User } from 'lucide-react';
import { TaskModal } from './modals/TaskModal';
import { KanbanBoard } from './KanbanBoard';

export const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { projects } = useSelector((state: RootState) => state.projects);
  const { users } = useSelector((state: RootState) => state.teams);
  const { activeModal, currentView } = useSelector((state: RootState) => state.ui);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesProject = projectFilter === 'all' || task.projectId === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const handleCreateTask = () => {
    setSelectedTask(null);
    dispatch(setActiveModal('task-modal'));
  };

  const handleEditTask = (taskId: string) => {
    setSelectedTask(taskId);
    dispatch(setActiveModal('task-modal'));
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.avatar || '';
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      new: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      blocked: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityStyles[priority as keyof typeof priorityStyles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track all your tasks</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggles */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => dispatch(setCurrentView('table'))}
              className={`p-2 rounded ${currentView === 'table' ? 'bg-white dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}
            >
              <Table className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch(setCurrentView('kanban'))}
              className={`p-2 rounded ${currentView === 'kanban' ? 'bg-white dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}
            >
              <Columns className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch(setCurrentView('list'))}
              className={`p-2 rounded ${currentView === 'list' ? 'bg-white dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleCreateTask}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {currentView === 'kanban' ? (
        <KanbanBoard tasks={filteredTasks} />
      ) : currentView === 'table' ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {task.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={getUserAvatar(task.assigneeId)}
                          alt=""
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {getUserName(task.assigneeId)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {getProjectName(task.projectId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {task.title}
                    </h3>
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{getUserName(task.assigneeId)}</span>
                    </div>
                    <div>
                      <span>Project: {getProjectName(task.projectId)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'all' || projectFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first task'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && projectFilter === 'all' && (
            <button
              onClick={handleCreateTask}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Task
            </button>
          )}
        </div>
      )}

      {/* Task Modal */}
      {activeModal === 'task-modal' && (
        <TaskModal
          taskId={selectedTask}
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
    </div>
  );
};