//Internal Lib Import
import { apiService } from './baseQuery';

export const othersService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    othersList: builder.query({
      query: () => ({
        url: 'others/othersList',
        method: 'GET',
      }),
    }),
    othersCreate: builder.mutation({
      query: (postBody) => ({
        url: 'others/othersCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('othersList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    othersUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `others/othersUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('othersList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].description = data?.data?.description;
              draft.data[findIndex].status = data?.data?.status;
              draft.data[findIndex].subject = data?.data?.subject;
              draft.data[findIndex].studentID = data?.data?.studentID;
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          // patchothers.undo();
        }
      },
    }),
    othersDelete: builder.mutation({
      query: (id) => ({
        url: `others/othersDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchothers = dispatch(
          apiService.util.updateQueryData('othersList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchothers.undo();
        }
      },
    }),
  }),
});

export const { useOthersCreateMutation, useOthersListQuery, useOthersUpdateMutation, useOthersDeleteMutation } =
  othersService;
