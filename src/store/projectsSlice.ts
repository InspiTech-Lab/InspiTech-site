// store/projectsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectsState } from "../types/project";
import { googleSheetsService } from "../services/googleSheets";

// ✅ Fetch projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const response = await googleSheetsService.fetchProjects();
    return response || [];
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
  }
});

// ✅ Upload project
export const uploadProject = createAsyncThunk(
  "projects/uploadProject",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await googleSheetsService.uploadProject(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

const initialState: ProjectsState = {
  projects: [],
  filteredProjects: [],
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 12,
  selectedCategory: "all",
  totalProjects: 0,
};

const projectsSlice = createSlice({
  name: "projects",
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
      // Fetch
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
      })

      // Upload
      .addCase(uploadProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

function applyFilters(state: ProjectsState) {
  let filtered = [...state.projects];
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
  }
  if (state.selectedCategory !== "all") {
    filtered = filtered.filter((project) =>
      project.description.toLowerCase().includes(state.selectedCategory.toLowerCase())
    );
  }
  state.filteredProjects = filtered;
  state.totalProjects = filtered.length;
}

export const { setSearchQuery, setSelectedCategory, setCurrentPage, setItemsPerPage, clearError } =
  projectsSlice.actions;

export default projectsSlice.reducer;
