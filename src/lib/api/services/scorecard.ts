import { api } from '../api';
import { endpoints } from '../endpoints';
import { type Metric, type Scorecard } from '@/types/interview';

export interface CreateScorecardDTO {
  title: string;
  metrics: Metric[];
  description?: string;
  role?: string;
}

export interface UpdateScorecardDTO {
  title?: string;
  metrics?: Metric[];
  description?: string;
  role?: string;
}

export interface AnalyzeResponse {
  metrics: Metric[];
}

export const scorecardService = {
  async analyze(input: { description: string }) {
    const response = await api.post<AnalyzeResponse>(endpoints.scorecards.analyze, input);
    return {
      data: {
        metrics: response.data.metrics || []
      }
    };
  },

  async getAll() {
    const response = await api.get<Scorecard[]>(endpoints.scorecards.list);
    return {
      data: Array.isArray(response.data) ? response.data : []
    };
  },

  async getById(id: string) {
    if (!id) {
      throw new Error('Scorecard ID is required');
    }
    console.log('Fetching scorecard:', id);
    try {
      const response = await api.get<Scorecard>(endpoints.scorecards.get(id));
      console.log('Scorecard response:', response.data);
      if (!response.data) {
        throw new Error('Scorecard not found');
      }
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching scorecard:', error);
      throw error;
    }
  },

  async create(data: CreateScorecardDTO) {
    if (!data.title || !data.metrics?.length) {
      throw new Error('Title and metrics are required');
    }
    const response = await api.post<Scorecard>(endpoints.scorecards.create, data);
    if (!response.data?.id) {
      throw new Error('Failed to create scorecard');
    }
    return { data: response.data };
  },

  async update(id: string, data: UpdateScorecardDTO) {
    if (!id) {
      throw new Error('Scorecard ID is required');
    }
    const response = await api.put<Scorecard>(endpoints.scorecards.update(id), data);
    return { data: response.data };
  },

  async delete(id: string) {
    if (!id) {
      throw new Error('Scorecard ID is required');
    }
    await api.delete(endpoints.scorecards.delete(id));
  },
}; 