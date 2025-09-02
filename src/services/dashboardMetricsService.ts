import { api } from '@/lib/api';
import { 
  DashboardMetricRecord, 
  CreateDashboardMetricInput, 
  UpdateDashboardMetricInput, 
  DashboardMetricsListParams 
} from '@/types/dashboardMetrics';

export const dashboardMetricsService = {
  // 📌 Listar métricas com filtros (ano, mês, etc)
  async listMetrics(params?: DashboardMetricsListParams): Promise<DashboardMetricRecord[]> {
    const { data } = await api.get('/metrics', { params });
    return data;
  },

  // 📌 Detalhar uma métrica
  async getMetric(id: string): Promise<DashboardMetricRecord> {
    const { data } = await api.get(`/metrics/${id}`);
    return data;
  },

  // 📌 Criar nova métrica
  async createMetric(payload: CreateDashboardMetricInput): Promise<DashboardMetricRecord> {
    const { data } = await api.post('/metrics', payload);
    return data;
  },

  // 📌 Atualizar métrica existente
  async updateMetric(id: string, payload: UpdateDashboardMetricInput): Promise<DashboardMetricRecord> {
    const { data } = await api.put(`/metrics/${id}`, payload);
    return data;
  },

  // 📌 Excluir métrica
  async deleteMetric(id: string): Promise<void> {
    await api.delete(`/metrics/${id}`);
  },
};
