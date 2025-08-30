import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectsState } from '../types/project';
import { googleSheetsService } from '../services/googleSheets';

// Async thunk for fetching projects from Google Sheets
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with your Google Apps Script URL
      // const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      const response = await googleSheetsService.fetchProjects();

      // if (!response.ok) {
      //   throw new Error('Failed to fetch projects');
      // }
      
      const data = await response;
      // console.log('Projects data:', data);
      return data || [];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const initialState: ProjectsState = {
  projects: [],
  filteredProjects: [],
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 12,
  selectedCategory: 'all',
  totalProjects: 0,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        applyFilters(state);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to apply search and category filters
function applyFilters(state: ProjectsState) {
  let filtered = [...state.projects];

  // Apply search filter
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
  }

  // Apply category filter (you can extend this based on project categories)
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter((project) =>
      project.description.toLowerCase().includes(state.selectedCategory.toLowerCase())
    );
  }

  state.filteredProjects = filtered;
  state.totalProjects = filtered.length;
}

export const {
  setSearchQuery,
  setSelectedCategory,
  setCurrentPage,
  setItemsPerPage,
  clearError,
} = projectsSlice.actions;

export default projectsSlice.reducer;