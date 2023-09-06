//Internal Lib Import
import { apiService } from './baseQuery';

export const subjectRepetitionService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    subjectRepetitionList: builder.query({
      query: () => ({
        url: 'subjectRepetition/subjectRepetitionList',
        method: 'GET',
      }),
    }),
    subjectRepetitionCreate: builder.mutation({
      query: (postBody) => ({
        url: 'subjectRepetition/subjectRepetitionCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('subjectRepetitionList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    subjectRepetitionUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `subjectRepetition/subjectRepetitionUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('subjectRepetitionList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].rollNo = postBody.rollNo;
              draft.data[findIndex].session = postBody.session;
              draft.data[findIndex].sessionCGPA = postBody.sessionCGPA;
              draft.data[findIndex].sessionRegistration = postBody.sessionRegistration;
              draft.data[findIndex].status = data?.data?.status;
              draft.data[findIndex].studentID = postBody.studentID;
              draft.data[findIndex].studentName = postBody.studentName;
              draft.data[findIndex].subject = postBody.subject;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchsubjectRepetition.undo();
        }
      },
    }),
    subjectRepetitionDelete: builder.mutation({
      query: (id) => ({
        url: `subjectRepetition/subjectRepetitionDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchsubjectRepetition = dispatch(
          apiService.util.updateQueryData('subjectRepetitionList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchsubjectRepetition.undo();
        }
      },
    }),
  }),
});

export const {
  useSubjectRepetitionCreateMutation,
  useSubjectRepetitionListQuery,
  useSubjectRepetitionUpdateMutation,
  useSubjectRepetitionDeleteMutation,
} = subjectRepetitionService;
