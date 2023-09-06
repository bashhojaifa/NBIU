//Internal Lib Import
import { apiService } from './baseQuery';

export const scholarshipService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    scholarshipList: builder.query({
      query: () => ({
        url: 'scholarship/scholarshipList',
        method: 'GET',
      }),
    }),
    scholarshipCreate: builder.mutation({
      query: (postBody) => ({
        url: 'scholarship/scholarshipCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('scholarshipList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    scholarshipUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `scholarship/scholarshipUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('scholarshipList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].description = postBody.description;
              draft.data[findIndex].scholarshipType = postBody.scholarshipType;
              draft.data[findIndex].status = data?.data?.status;
              draft.data[findIndex].studentID = postBody.studentID;
              draft.data[findIndex].subject = postBody.subject;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          // patchscholarship.undo();
        }
      },
    }),
    scholarshipDelete: builder.mutation({
      query: (id) => ({
        url: `scholarship/scholarshipDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchscholarship = dispatch(
          apiService.util.updateQueryData('scholarshipList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchscholarship.undo();
        }
      },
    }),
  }),
});

export const {
  useScholarshipCreateMutation,
  useScholarshipListQuery,
  useScholarshipUpdateMutation,
  useScholarshipDeleteMutation,
} = scholarshipService;
