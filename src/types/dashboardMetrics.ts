export type DashboardMetricRecord = {
  id: string;
  user_id: string;
  period: string; // ou Date se preferir tratar como objeto
  investment: number;
  visitors: number;
  bot_conversations: number;
  human_conversations: number;
  proposals: number;
  closed_deals: number;
  created_at: string;
  updated_at: string;
};

export type CreateDashboardMetricInput = Omit<DashboardMetricRecord, 'id' | 'created_at' | 'updated_at'>;

export type UpdateDashboardMetricInput = Partial<CreateDashboardMetricInput>;

export type DashboardMetricsListParams = {
  year?: number;
  month?: number;
  week?: number;
  start_date?: string;
  end_date?: string;
};
