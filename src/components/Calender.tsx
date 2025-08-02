import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, FileText } from 'lucide-react';

interface ProjectEvent {
  id: string;
  title: string;
  type: 'instagram-post' | 'website' | 'pricing-page' | 'presentation' | 'platform' | 'design';
  date: Date;
  time: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  color: string;
  participants?: number;
}

const mockEvents: ProjectEvent[] = [
  {
    id: '1',
    title: 'StrataScratch - Instagram Post',
    type: 'instagram-post',
    date: new Date(2022, 4, 5), // May 5, 2022
    time: '00:34',
    duration: '2 hours',
    status: 'completed',
    color: 'bg-blue-500',
    participants: 2
  },
  {
    id: '2',
    title: 'StrataScratch - Instagram Post #2',
    type: 'instagram-post',
    date: new Date(2022, 4, 8), // May 8, 2022
    time: '10:00',
    duration: '1 hour',
    status: 'completed',
    color: 'bg-orange-500',
    participants: 1
  },
  {
    id: '3',
    title: 'StrataScratch - Instagram Post #3',
    type: 'instagram-post',
    date: new Date(2022, 4, 25), // May 25, 2022
    time: '14:00',
    duration: '3 hours',
    status: 'completed',
    color: 'bg-green-500',
    participants: 3
  },
  {
    id: '4',
    title: 'New Website Header Image',
    type: 'website',
    date: new Date(2022, 4, 12), // May 12, 2022
    time: '09:30',
    duration: '4 hours',
    status: 'in-progress',
    color: 'bg-purple-500',
    participants: 1
  },
  {
    id: '5',
    title: 'StrataScratch - New Pricing Page',
    type: 'pricing-page',
    date: new Date(2022, 4, 15), // May 15, 2022
    time: '11:00',
    duration: '6 hours',
    status: 'in-progress',
    color: 'bg-emerald-500',
    participants: 2
  },
  {
    id: '6',
    title: 'Strata Scratch - Behance Presentation',
    type: 'presentation',
    date: new Date(2022, 4, 20), // May 20, 2022
    time: '16:00',
    duration: '2 hours',
    status: 'upcoming',
    color: 'bg-yellow-500',
    participants: 4
  },
  {
    id: '7',
    title: 'Testing (Platform Pages)',
    type: 'platform',
    date: new Date(2022, 4, 18), // May 18, 2022
    time: '13:00',
    duration: '5 hours',
    status: 'in-progress',
    color: 'bg-indigo-500',
    participants: 2
  },
  {
    id: '8',
    title: 'StrataScratch - Design All Pages',
    type: 'design',
    date: new Date(2022, 4, 17), // May 17, 2022
    time: '10:30',
    duration: '8 hours',
    status: 'in-progress',
    color: 'bg-teal-500',
    participants: 3
  },
  {
    id: '9',
    title: 'StrataScratch - Behance Presentation',
    type: 'presentation',
    date: new Date(2022, 4, 22), // May 22, 2022
    time: '15:00',
    duration: '3 hours',
    status: 'completed',
    color: 'bg-red-500',
    participants: 2
  }
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 4, 1)); // May 2022
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'chronology' | 'calendar'>('chronology');
  const [sortBy, setSortBy] = useState('default');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(prev.getFullYear() - 1);
      } else {
        newDate.setFullYear(prev.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getFilteredAndSortedEvents = () => {
    let filteredEvents = mockEvents.filter(event => 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );

    if (selectedDate) {
      filteredEvents = filteredEvents.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      );
    }

    switch (sortBy) {
      case 'date':
        return filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
      case 'type':
        return filteredEvents.sort((a, b) => a.type.localeCompare(b.type));
      case 'status':
        return filteredEvents.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return filteredEvents;
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-yellow-400';
      case 'upcoming':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'instagram-post':
        return '📱';
      case 'website':
        return '🌐';
      case 'pricing-page':
        return '💰';
      case 'presentation':
        return '📊';
      case 'platform':
        return '⚡';
      case 'design':
        return '🎨';
      default:
        return '📄';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSameDate = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('chronology')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'chronology' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Chronology
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'calendar' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-800 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-800 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateYear('prev')}
              className="px-2 py-1 text-xs hover:bg-gray-800 rounded"
            >
              -{currentDate.getFullYear()}
            </button>
            <button 
              onClick={() => navigateYear('next')}
              className="px-2 py-1 text-xs hover:bg-gray-800 rounded"
            >
              +{currentDate.getFullYear()}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
            >
              <option value="default">Default</option>
              <option value="date">Date</option>
              <option value="type">Type</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          {selectedDate && (
            <button 
              onClick={() => setSelectedDate(null)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        {/* Calendar Grid (always visible) */}
        <div className="w-80 bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-gray-400 p-2 font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((date, index) => {
              if (!date) {
                return <div key={index} className="h-10"></div>;
              }
              
              const events = getEventsForDate(date);
              const isSelected = isSameDate(selectedDate, date);
              const todayClass = isToday(date) ? 'bg-blue-600 text-white' : '';
              const selectedClass = isSelected ? 'ring-2 ring-blue-400' : '';
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(isSelected ? null : date)}
                  className={`h-10 text-sm rounded hover:bg-gray-700 transition-colors relative ${todayClass} ${selectedClass} ${
                    events.length > 0 ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  <span>{date.getDate()}</span>
                  {events.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {events.slice(0, 3).map((event, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${event.color.replace('bg-', 'bg-')}`}></div>
                      ))}
                      {events.length > 3 && (
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto">
          {selectedDate && (
            <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium">
                Events for {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>
          )}
          
          <div className="space-y-4">
            {getFilteredAndSortedEvents().map((event) => (
              <div key={event.id} className="flex items-start gap-4 group">
                {/* Time indicator */}
                <div className="w-16 text-right">
                  <div className="text-xs text-gray-400">{event.time}</div>
                  <div className="text-xs text-gray-500">
                    {event.date.getDate()}/{event.date.getMonth() + 1}
                  </div>
                </div>
                
                {/* Event card */}
                <div className="relative bg-gray-800 hover:bg-gray-750 rounded-lg p-4 flex-1 transition-colors border border-gray-700">
                  {/* Color indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${event.color}`}></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getTypeIcon(event.type)}</span>
                      <div>
                        <h3 className="font-medium text-white">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.duration}
                          </span>
                          {event.participants && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.participants}
                            </span>
                          )}
                          <span className={`text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {getFilteredAndSortedEvents().length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events found for the selected {selectedDate ? 'date' : 'month'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 w-3/4 rounded-full"></div>
      </div>
    </div>
  );
};

export { Calendar };