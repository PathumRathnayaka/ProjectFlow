import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectEvent {
  id: string;
  title: string;
  type: 'instagram-post' | 'website' | 'pricing-page' | 'presentation' | 'platform' | 'design';
  date: string; // ISO string format for serialization
  time: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  color: string;
  participants?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'chronology' | 'calendar';
export type SortBy = 'default' | 'date' | 'type' | 'status';

interface CalendarState {
  events: ProjectEvent[];
  currentDate: string; // ISO string format
  selectedDate: string | null; // ISO string format
  viewMode: ViewMode;
  sortBy: SortBy;
  loading: boolean;
  error: string | null;
}

const mockEvents: ProjectEvent[] = [
  {
    id: '1',
    title: 'StrataScratch - Instagram Post',
    type: 'instagram-post',
    date: '2022-05-05T00:34:00.000Z',
    time: '00:34',
    duration: '2 hours',
    status: 'completed',
    color: 'bg-blue-500',
    participants: 2,
    description: 'Create engaging Instagram post for StrataScratch platform',
    createdAt: '2022-05-01T10:00:00.000Z',
    updatedAt: '2022-05-05T02:34:00.000Z',
  },
  {
    id: '2',
    title: 'StrataScratch - Instagram Post #2',
    type: 'instagram-post',
    date: '2022-05-08T10:00:00.000Z',
    time: '10:00',
    duration: '1 hour',
    status: 'completed',
    color: 'bg-orange-500',
    participants: 1,
    description: 'Follow-up Instagram post with analytics insights',
    createdAt: '2022-05-06T09:00:00.000Z',
    updatedAt: '2022-05-08T11:00:00.000Z',
  },
  {
    id: '3',
    title: 'StrataScratch - Instagram Post #3',
    type: 'instagram-post',
    date: '2022-05-25T14:00:00.000Z',
    time: '14:00',
    duration: '3 hours',
    status: 'completed',
    color: 'bg-green-500',
    participants: 3,
    description: 'Collaborative Instagram content creation session',
    createdAt: '2022-05-20T08:00:00.000Z',
    updatedAt: '2022-05-25T17:00:00.000Z',
  },
  {
    id: '4',
    title: 'New Website Header Image',
    type: 'website',
    date: '2022-05-12T09:30:00.000Z',
    time: '09:30',
    duration: '4 hours',
    status: 'in-progress',
    color: 'bg-purple-500',
    participants: 1,
    description: 'Design and implement new header image for website',
    createdAt: '2022-05-10T14:00:00.000Z',
    updatedAt: '2022-05-12T13:30:00.000Z',
  },
  {
    id: '5',
    title: 'StrataScratch - New Pricing Page',
    type: 'pricing-page',
    date: '2022-05-15T11:00:00.000Z',
    time: '11:00',
    duration: '6 hours',
    status: 'in-progress',
    color: 'bg-emerald-500',
    participants: 2,
    description: 'Redesign pricing page with new subscription tiers',
    createdAt: '2022-05-12T16:00:00.000Z',
    updatedAt: '2022-05-15T17:00:00.000Z',
  },
  {
    id: '6',
    title: 'Strata Scratch - Behance Presentation',
    type: 'presentation',
    date: '2022-05-20T16:00:00.000Z',
    time: '16:00',
    duration: '2 hours',
    status: 'upcoming',
    color: 'bg-yellow-500',
    participants: 4,
    description: 'Prepare presentation for Behance portfolio showcase',
    createdAt: '2022-05-18T10:00:00.000Z',
    updatedAt: '2022-05-18T10:00:00.000Z',
  },
  {
    id: '7',
    title: 'Testing (Platform Pages)',
    type: 'platform',
    date: '2022-05-18T13:00:00.000Z',
    time: '13:00',
    duration: '5 hours',
    status: 'in-progress',
    color: 'bg-indigo-500',
    participants: 2,
    description: 'Comprehensive testing of all platform pages',
    createdAt: '2022-05-15T11:00:00.000Z',
    updatedAt: '2022-05-18T18:00:00.000Z',
  },
  {
    id: '8',
    title: 'StrataScratch - Design All Pages',
    type: 'design',
    date: '2022-05-17T10:30:00.000Z',
    time: '10:30',
    duration: '8 hours',
    status: 'in-progress',
    color: 'bg-teal-500',
    participants: 3,
    description: 'Complete design overhaul for all platform pages',
    createdAt: '2022-05-14T09:00:00.000Z',
    updatedAt: '2022-05-17T18:30:00.000Z',
  },
  {
    id: '9',
    title: 'StrataScratch - Behance Presentation',
    type: 'presentation',
    date: '2022-05-22T15:00:00.000Z',
    time: '15:00',
    duration: '3 hours',
    status: 'completed',
    color: 'bg-red-500',
    participants: 2,
    description: 'Final presentation preparation and delivery',
    createdAt: '2022-05-19T12:00:00.000Z',
    updatedAt: '2022-05-22T18:00:00.000Z',
  }
];

const initialState: CalendarState = {
  events: mockEvents,
  currentDate: '2022-05-01T00:00:00.000Z', // May 2022
  selectedDate: null,
  viewMode: 'chronology',
  sortBy: 'default',
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<ProjectEvent, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newEvent: ProjectEvent = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.events.push(newEvent);
    },
    updateEvent: (state, action: PayloadAction<Partial<ProjectEvent> & { id: string }>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    updateEventStatus: (state, action: PayloadAction<{ id: string; status: ProjectEvent['status'] }>) => {
      const event = state.events.find(e => e.id === action.payload.id);
      if (event) {
        event.status = action.payload.status;
        event.updatedAt = new Date().toISOString();
      }
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    navigateMonth: (state, action: PayloadAction<'prev' | 'next'>) => {
      const currentDate = new Date(state.currentDate);
      if (action.payload === 'prev') {
        currentDate.setMonth(currentDate.getMonth() - 1);
      } else {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      state.currentDate = currentDate.toISOString();
    },
    navigateYear: (state, action: PayloadAction<'prev' | 'next'>) => {
      const currentDate = new Date(state.currentDate);
      if (action.payload === 'prev') {
        currentDate.setFullYear(currentDate.getFullYear() - 1);
      } else {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
      state.currentDate = currentDate.toISOString();
    },
    clearSelectedDate: (state) => {
      state.selectedDate = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  updateEventStatus,
  setCurrentDate,
  setSelectedDate,
  setViewMode,
  setSortBy,
  navigateMonth,
  navigateYear,
  clearSelectedDate,
  setLoading,
  setError,
} = calendarSlice.actions;

export default calendarSlice.reducer;