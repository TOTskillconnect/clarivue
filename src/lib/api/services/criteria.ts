import { api } from '../client';
import { endpoints } from '../endpoints';
import { type Criterion, type HiringCriteria, type JDInput } from '@/types/hiring';

export interface CreateCriteriaDTO {
  title: string;
  criteria: Criterion[];
  jdText: string;
}

export interface UpdateCriteriaDTO {
  title?: string;
  criteria?: Criterion[];
}

export const criteriaService = {
  async analyze(input: JDInput) {
    return api.post<{ criteria: Criterion[] }>(endpoints.criteria.analyze, input);
  },

  async getAll() {
    return api.get<HiringCriteria[]>(endpoints.criteria.list);
  },

  async getById(id: string) {
    return api.get<HiringCriteria>(endpoints.criteria.get(id));
  },

  async create(data: CreateCriteriaDTO) {
    return api.post<HiringCriteria>(endpoints.criteria.create, data);
  },

  async update(id: string, data: UpdateCriteriaDTO) {
    return api.put<HiringCriteria>(endpoints.criteria.update(id), data);
  },

  async delete(id: string) {
    return api.delete(endpoints.criteria.delete(id));
  },
}; 