export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  zipUrl: string;
  liveDemo: string;
  isPublished: boolean;
}

export interface ProjectsState {
  projects: Project[];
  filteredProjects: Project[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  selectedCategory: string;
  totalProjects: number;
}

export interface ApiResponse {
  success: boolean;
  data: Project[];
  error?: string;
}