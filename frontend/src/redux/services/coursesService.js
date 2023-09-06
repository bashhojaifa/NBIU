//Internal Lib Import
import { apiService } from './baseQuery';

export const coursesService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    coursesList: builder.query({
      query: () => ({
        url: 'courses/coursesList',
        method: 'GET',
      }),
    }),
    coursesCreate: builder.mutation({
      query: (postBody) => ({
        url: 'courses/coursesCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('coursesList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    coursesUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `courses/coursesUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('coursesList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].coursesCode = data?.data?.coursesCode;
              draft.data[findIndex].coursesName = data?.data?.coursesName;
              draft.data[findIndex].coursesInstructor = data?.data?.coursesInstructor;
              draft.data[findIndex].seatsLimit = data?.data?.seatsLimit;
              draft.data[findIndex].registrationDeadline = data?.data?.registrationDeadline;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchcourses.undo();
        }
      },
    }),
    coursesDelete: builder.mutation({
      query: (id) => ({
        url: `courses/coursesDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchcourses = dispatch(
          apiService.util.updateQueryData('coursesList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchcourses.undo();
        }
      },
    }),
  }),
});

export const { useCoursesCreateMutation, useCoursesListQuery, useCoursesUpdateMutation, useCoursesDeleteMutation } =
  coursesService;
