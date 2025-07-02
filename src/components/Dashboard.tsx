import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  BarChart3, 
  Clock, 
  Users, 
  Folder, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { projects } = useSelector((state: RootState) => state.projects);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { users, teams } = useSelector((state: RootState) => state.teams);

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    totalUsers: users.length,
    totalTeams: teams.length,
  };

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const upcomingDeadlines = tasks
    .filter(t => t.status !== 'completed')
    .slice()
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Folder className="h-6 w-6" />}
          title="Total Projects"
          value={stats.totalProjects}
          subtitle={`${stats.activeProjects} active`}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle className="h-6 w-6" />}
          title="Tasks Completed"
          value={stats.completedTasks}
          subtitle={`of ${stats.totalTasks} total`}
          color="green"
        />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          title="Team Members"
          value={stats.totalUsers}
          subtitle={`${stats.totalTeams} teams`}
          color="purple"
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Completion Rate"
          value={`${Math.round((stats.completedTasks / stats.totalTasks) * 100)}%`}
          subtitle="This month"
          color="orange"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
            <Clock className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-xs text-gray-500">{new Date(task.updatedAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h2>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyBadge(task.dueDate)}`}>
                  {getDaysUntilDue(task.dueDate)} days
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Progress</h2>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</span>
                <span className="text-sm text-gray-500">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'in-progress': return 'bg-blue-500';
    case 'scheduled': return 'bg-yellow-500';
    case 'blocked': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getUrgencyBadge = (dueDate: string) => {
  const days = getDaysUntilDue(dueDate);
  if (days <= 1) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  if (days <= 3) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
  if (days <= 7) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
};

const getDaysUntilDue = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};