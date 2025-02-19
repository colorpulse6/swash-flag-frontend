import { Flag } from './types.ts';

const API_URL = 'http://localhost:4000/api/flags';

export class FlagService {
  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const errorText = await response.text();
      console.error(response);

      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }
    return response.json();
  }

  /** Fetch all flags */
  static async fetchFlags(): Promise<Flag[] | { error: string }> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch('http://localhost:4000/api/flags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { error: `Failed to fetch flags: ${errorText}` };
      }

      return response.json();
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  /** Toggle a feature flag */
  static async toggleFlag(
    id: string,
    currentEnabled: boolean,
  ): Promise<Flag | { error: string }> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !currentEnabled }),
      });

      return await FlagService.handleResponse(response);
    } catch (error) {
      console.error(`Error toggling flag ${id}:`, error);
      return { error: (error as Error).message };
    }
  }

  /** Create a new feature flag */
  static async createFlag(name: string): Promise<Flag | { error: string }> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          enabled: false,
          targeting: { default: false, rules: [] },
        }),
      });

      return await FlagService.handleResponse(response);
    } catch (error) {
      console.error('Error creating flag:', error);
      return { error: (error as Error).message };
    }
  }

  /** Delete a feature flag */
  static async deleteFlag(id: string): Promise<void | { error: string }> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete flag: ${errorText}`);
      }
    } catch (error) {
      console.error(`Error deleting flag ${id}:`, error);
      return { error: (error as Error).message };
    }
  }
}

export default FlagService;
