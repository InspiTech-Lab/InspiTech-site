import { Project } from '../types/project';



export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private appsScriptUrl: string;
  private apiToken: string;

  private constructor() {
    // Read from Vite env
    this.appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
    this.apiToken = import.meta.env.VITE_API_TOKEN;
  }

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  async fetchProjects(): Promise<Project[]> {
    try {
      const url = `${this.appsScriptUrl}?token=${this.apiToken}`;
      const response = await fetch(url);



      if (!response.ok) {
        throw new Error("Failed to fetch projects from Google Sheets");
      }

      const data = await response.json();

      return data.projects || [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  setAppsScriptUrl(url: string) {
    this.appsScriptUrl = url;
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();