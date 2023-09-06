//Internal Lib Import
import { apiService } from './baseQuery';

export const summerAssessmentService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    summerAssessmentList: builder.query({
      query: () => ({
        url: 'summerAssessment/summerAssessmentList',
        method: 'GET',
      }),
    }),
    summerAssessmentCreate: builder.mutation({
      query: (postBody) => ({
        url: 'summerAssessment/summerAssessmentCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('summerAssessmentList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),
    summerAssessmentApply: builder.mutation({
      query: ({ id, enrolls }) => ({
        url: `summerAssessment/summerAssessmentApply/${id}`,
        method: 'PATCH',
        body: {
          enrolls: enrolls,
        },
      }),
      async onQueryStarted({ id, enrolls }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            window.location.reload();
          }
        } catch {}
      },
    }),

    summerAssessmentUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `summerAssessment/summerAssessmentUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('summerAssessmentList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].name = data?.data.name;
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchsummerAssessment.undo();
        }
      },
    }),
    summerAssessmentDelete: builder.mutation({
      query: (id) => ({
        url: `summerAssessment/summerAssessmentDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchsummerAssessment = dispatch(
          apiService.util.updateQueryData('summerAssessmentList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchsummerAssessment.undo();
        }
      },
    }),
  }),
});

export const {
  useSummerAssessmentCreateMutation,
  useSummerAssessmentApplyMutation,
  useSummerAssessmentListQuery,
  useSummerAssessmentUpdateMutation,
  useSummerAssessmentDeleteMutation,
} = summerAssessmentService;
