//Internal Lib Import
import { apiService } from './baseQuery';

export const insCoursesService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    insCoursesList: builder.query({
      query: () => ({
        url: 'insCourses/insCoursesList',
        method: 'GET',
      }),
    }),
    insCoursesCreate: builder.mutation({
      query: (postBody) => ({
        url: 'insCourses/insCoursesCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('insCoursesList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    insCoursesUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `insCourses/insCoursesUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('insCoursesList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].coursesCode = data?.data?.coursesCode;
              draft.data[findIndex].coursesName = data?.data?.coursesName;
              draft.data[findIndex].coursesInstructor = data?.data?.coursesInstructor;
              draft.data[findIndex].resources = data?.data?.resources;
              draft.data[findIndex].coursesHistory = data?.data?.coursesHistory;
            })
          );

          if (data) {
            window.location.reload();
          }

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchinsCourses.undo();
        }
      },
    }),
    insCoursesDelete: builder.mutation({
      query: (id) => ({
        url: `insCourses/insCoursesDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchinsCourses = dispatch(
          apiService.util.updateQueryData('insCoursesList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchinsCourses.undo();
        }
      },
    }),
    insCoursesHistoryDelete: builder.mutation({
      query: ({ id, hid }) => ({
        url: `insCourses/insCoursesHistoryDelete/${id}/${hid}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            window.location.reload();
          }
        } catch {
          //patchinsCourses.undo();
        }
      },
    }),
  }),
});

export const {
  useInsCoursesCreateMutation,
  useInsCoursesListQuery,
  useInsCoursesUpdateMutation,
  useInsCoursesDeleteMutation,
  useInsCoursesHistoryDeleteMutation,
} = insCoursesService;
