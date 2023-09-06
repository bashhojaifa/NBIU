//Internal Lib Import
import { apiService } from './baseQuery';

export const retakeAssessmentService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    retakeAssessmentList: builder.query({
      query: () => ({
        url: 'retakeAssessment/retakeAssessmentList',
        method: 'GET',
      }),
    }),
    retakeAssessmentCreate: builder.mutation({
      query: (postBody) => ({
        url: 'retakeAssessment/retakeAssessmentCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('retakeAssessmentList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    retakeAssessmentUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `retakeAssessment/retakeAssessmentUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('retakeAssessmentList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].assessmentType = data?.data.assessmentType;
              draft.data[findIndex].instructor = data?.data.instructor;
              draft.data[findIndex].reason = data?.data.reason;
              draft.data[findIndex].status = data?.data?.status;
              draft.data[findIndex].studentID = data?.data.studentID;
              draft.data[findIndex].subject = data?.data.subject;
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchretakeAssessment.undo();
        }
      },
    }),
    retakeAssessmentDelete: builder.mutation({
      query: (id) => ({
        url: `retakeAssessment/retakeAssessmentDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchretakeAssessment = dispatch(
          apiService.util.updateQueryData('retakeAssessmentList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchretakeAssessment.undo();
        }
      },
    }),
  }),
});

export const {
  useRetakeAssessmentCreateMutation,
  useRetakeAssessmentListQuery,
  useRetakeAssessmentUpdateMutation,
  useRetakeAssessmentDeleteMutation,
} = retakeAssessmentService;
