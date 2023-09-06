//Internal Lib Import
import { apiService } from './baseQuery';

export const dashboardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    dashboardSummary: builder.query({
      query: () => ({
        url: 'dashboard/dashboardSummary',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyDashboardSummaryQuery, useDashboardSummaryQuery } = dashboardService;
