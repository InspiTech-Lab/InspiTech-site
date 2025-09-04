// services/googleSheets.ts
import { Project } from "../types/project";

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private appsScriptUrl: string;
  private apiToken: string;

  private constructor() {
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
    const url = `${this.appsScriptUrl}?token=${this.apiToken}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch projects from Google Sheets");

    const data = await response.json();
    let projects: Project[] = data.projects || [];

    projects.sort((a, b) => Number(b.id) - Number(a.id));
    return projects;
  }

  async uploadProject(payload: any): Promise<any> {
    const url = this.appsScriptUrl;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to upload project");

    return response.json();
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();
