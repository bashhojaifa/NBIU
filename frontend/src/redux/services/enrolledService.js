//Internal Lib Import
import { apiService } from './baseQuery';

export const enrollService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    enrollList: builder.query({
      query: () => ({
        url: 'enroll/enrollList',
        method: 'GET',
      }),
    }),
    enrollListByCoursesID: builder.query({
      query: (coursesID) => ({
        url: 'enroll/enrollListByCoursesID/' + coursesID,
        method: 'GET',
      }),
    }),
    enrollCreate: builder.mutation({
      query: (postBody) => ({
        url: 'enroll/enrollCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('enrollList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    enrollUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `enroll/enrollUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('enrollList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].enrollName = data?.data?.enrollName;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchenroll.undo();
        }
      },
    }),
    enrollDelete: builder.mutation({
      query: (id) => ({
        url: `enroll/enrollDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchenroll = dispatch(
          apiService.util.updateQueryData('enrollList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchenroll.undo();
        }
      },
    }),
  }),
});

export const {
  useEnrollCreateMutation,
  useEnrollListQuery,
  useEnrollUpdateMutation,
  useEnrollDeleteMutation,
  useEnrollListByCoursesIDQuery,
} = enrollService;
