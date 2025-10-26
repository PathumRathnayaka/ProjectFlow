import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { ProjectSidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Tasks } from './components/Tasks';
import { Teams } from './components/Teams';
import { Calendar } from './components/Calender';
import { cn } from './lib/utils';
import { fetchTeams, fetchUsers } from './store/slices/teamsSlice';

// Separate component to use Redux hooks
const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'tasks':
        return <Tasks />;
      case 'teams':
        return <Teams />;
      case 'calendar':
        return <Calendar />;
      case 'reports':
        return (
          <div className="flex flex-1 flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Reports and analytics coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-1 flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={cn(
      "mx-auto flex w-full max-w-full flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 md:flex-row",
      "h-screen"
    )}>
      <ProjectSidebar 
        onNavigate={setCurrentSection}
        currentSection={currentSection}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-full w-full flex-1 flex-col overflow-y-auto bg-white dark:bg-gray-900">
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;