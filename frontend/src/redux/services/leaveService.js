//Internal Lib Import
import { apiService } from './baseQuery';

export const leaveService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    leaveList: builder.query({
      query: () => ({
        url: 'leave/leaveList',
        method: 'GET',
      }),
    }),
    leaveCreate: builder.mutation({
      query: (postBody) => ({
        url: 'leave/leaveCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('leaveList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    leaveUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `leave/leaveUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('leaveList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].duration = data?.data?.duration;
              draft.data[findIndex].endDate = data?.data?.endDate;
              draft.data[findIndex].reason = data?.data?.reason;
              draft.data[findIndex].startDate = data?.data?.startDate;
              draft.data[findIndex].status = data?.data?.status;
              draft.data[findIndex].studentID = data?.data?.studentID;
              draft.data[findIndex].subject = data?.data?.subject;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchleave.undo();
        }
      },
    }),
    leaveDelete: builder.mutation({
      query: (id) => ({
        url: `leave/leaveDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchleave = dispatch(
          apiService.util.updateQueryData('leaveList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchleave.undo();
        }
      },
    }),
  }),
});

export const { useLeaveCreateMutation, useLeaveListQuery, useLeaveUpdateMutation, useLeaveDeleteMutation } = leaveService;
