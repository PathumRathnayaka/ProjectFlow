import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, FileText } from 'lucide-react';
import {
  ProjectEvent,
  ViewMode,
  SortBy,
  setSelectedDate,
  setViewMode,
  setSortBy,
  navigateMonth,
  navigateYear,
  clearSelectedDate,
} from '../store/slices/calenderSlice';

// Assuming you have a RootState type defined elsewhere
interface RootState {
  calendar: {
    events: ProjectEvent[];
    currentDate: string;
    selectedDate: string | null;
    viewMode: ViewMode;
    sortBy: SortBy;
    loading: boolean;
    error: string | null;
  };
}

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const {
    events,
    currentDate,
    selectedDate,
    viewMode,
    sortBy,
    loading,
    error
  } = useSelector((state: RootState) => state.calendar);

  const currentDateObj = new Date(currentDate);
  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleNavigateMonth = (direction: 'prev' | 'next') => {
    dispatch(navigateMonth(direction));
  };

  const handleNavigateYear = (direction: 'prev' | 'next') => {
    dispatch(navigateYear(direction));
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString();
    if (selectedDate === dateStr) {
      dispatch(clearSelectedDate());
    } else {
      dispatch(setSelectedDate(dateStr));
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  const handleSortByChange = (sort: SortBy) => {
    dispatch(setSortBy(sort));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };

  const getFilteredAndSortedEvents = () => {
    let filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDateObj.getMonth() &&
        eventDate.getFullYear() === currentDateObj.getFullYear();
    });

    if (selectedDateObj) {
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === selectedDateObj.getDate() &&
          eventDate.getMonth() === selectedDateObj.getMonth() &&
          eventDate.getFullYear() === selectedDateObj.getFullYear();
      });
    }

    switch (sortBy) {
      case 'date':
        return filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'type':
        return filteredEvents.sort((a, b) => a.type.localeCompare(b.type));
      case 'status':
        return filteredEvents.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return filteredEvents;
    }
  };

  const getDaysInMonth = () => {
    const year = currentDateObj.getFullYear();
    const month = currentDateObj.getMonth();
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

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-900 text-white min-h-screen">
        <div className="text-lg">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-900 text-white min-h-screen">
        <div className="text-lg text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => handleViewModeChange('chronology')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'chronology' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Chronology
            </button>
            <button
              onClick={() => handleViewModeChange('calendar')}
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
              onClick={() => handleNavigateMonth('prev')}
              className="p-2 hover:bg-gray-800 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-medium min-w-[120px] text-center">
              {monthNames[currentDateObj.getMonth()]} {currentDateObj.getFullYear()}
            </span>
            <button 
              onClick={() => handleNavigateMonth('next')}
              className="p-2 hover:bg-gray-800 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleNavigateYear('prev')}
              className="px-2 py-1 text-xs hover:bg-gray-800 rounded"
            >
              -{currentDateObj.getFullYear()}
            </button>
            <button 
              onClick={() => handleNavigateYear('next')}
              className="px-2 py-1 text-xs hover:bg-gray-800 rounded"
            >
              +{currentDateObj.getFullYear()}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortByChange(e.target.value as SortBy)}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
            >
              <option value="default">Default</option>
              <option value="date">Date</option>
              <option value="type">Type</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          {selectedDateObj && (
            <button 
              onClick={() => dispatch(clearSelectedDate())}
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
              const isSelected = isSameDate(selectedDateObj, date);
              const todayClass = isToday(date) ? 'bg-blue-600 text-white' : '';
              const selectedClass = isSelected ? 'ring-2 ring-blue-400' : '';
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
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
          {selectedDateObj && (
            <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium">
                Events for {selectedDateObj.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>
          )}
          
          <div className="space-y-4">
            {getFilteredAndSortedEvents().map((event) => {
              const eventDate = new Date(event.date);
              return (
                <div key={event.id} className="flex items-start gap-4 group">
                  {/* Time indicator */}
                  <div className="w-16 text-right">
                    <div className="text-xs text-gray-400">{event.time}</div>
                    <div className="text-xs text-gray-500">
                      {eventDate.getDate()}/{eventDate.getMonth() + 1}
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
                          {event.description && (
                            <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {getFilteredAndSortedEvents().length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events found for the selected {selectedDateObj ? 'date' : 'month'}</p>
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