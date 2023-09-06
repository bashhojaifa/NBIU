//Internal Lib Import
import { apiService } from './baseQuery';

export const instructorService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    instructorList: builder.query({
      query: () => ({
        url: 'instructor/instructorList',
        method: 'GET',
      }),
    }),
    instructorCreate: builder.mutation({
      query: (postBody) => ({
        url: 'instructor/instructorCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('instructorList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    instructorUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `instructor/instructorUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('instructorList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].name = data?.data?.name;
              draft.data[findIndex].email = data?.data?.email;
              draft.data[findIndex].password = data?.data?.password;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchinstructor.undo();
        }
      },
    }),
    instructorDelete: builder.mutation({
      query: (id) => ({
        url: `instructor/instructorDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchinstructor = dispatch(
          apiService.util.updateQueryData('instructorList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchinstructor.undo();
        }
      },
    }),
  }),
});

export const {
  useInstructorCreateMutation,
  useInstructorListQuery,
  useInstructorUpdateMutation,
  useInstructorDeleteMutation,
} = instructorService;
