import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewMode = 'table' | 'kanban' | 'list';

interface UIState {
  sidebarOpen: boolean;
  currentView: ViewMode;
  activeModal: string | null;
  searchQuery: string;
  filterStatus: string[];
  filterPriority: string[];
  filterTeam: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: UIState = {
  sidebarOpen: true,
  currentView: 'table',
  activeModal: null,
  searchQuery: '',
  filterStatus: [],
  filterPriority: [],
  filterTeam: [],
  sortBy: 'updatedAt',
  sortOrder: 'desc',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<ViewMode>) => {
      state.currentView = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string[]>) => {
      state.filterStatus = action.payload;
    },
    setFilterPriority: (state, action: PayloadAction<string[]>) => {
      state.filterPriority = action.payload;
    },
    setFilterTeam: (state, action: PayloadAction<string[]>) => {
      state.filterTeam = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.filterStatus = [];
      state.filterPriority = [];
      state.filterTeam = [];
    },
  },
});

export const {
  setSidebarOpen,
  setCurrentView,
  setActiveModal,
  setSearchQuery,
  setFilterStatus,
  setFilterPriority,
  setFilterTeam,
  setSortBy,
  setSortOrder,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;