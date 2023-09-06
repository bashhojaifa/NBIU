//Internal Lib Import
import { apiService } from './baseQuery';

export const sessionService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    sessionList: builder.query({
      query: () => ({
        url: 'session/sessionList',
        method: 'GET',
      }),
    }),
    sessionDropDown: builder.query({
      query: () => ({
        url: 'session/sessionDropDown',
        method: 'GET',
      }),
    }),
    sessionCreate: builder.mutation({
      query: (postBody) => ({
        url: 'session/sessionCreate',
        method: 'POST',
        body: postBody,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData('sessionList', undefined, (draft) => {
              draft.data.push(data.data);
            })
          );
          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {}
      },
    }),

    sessionUpdate: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `session/sessionUpdate/${id}`,
        method: 'PATCH',
        body: postBody,
      }),

      async onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiService.util.updateQueryData('sessionList', undefined, (draft) => {
              const findIndex = draft.data.findIndex((role) => role.id === id);
              draft.data[findIndex].sessionName = data?.data?.sessionName;
              draft.data[findIndex].sessionYear = data?.data?.sessionYear;
            })
          );

          //dispatch(dashboardService.endpoints.dashboardSummary.initiate());
        } catch {
          //patchsession.undo();
        }
      },
    }),
    sessionDelete: builder.mutation({
      query: (id) => ({
        url: `session/sessionDelete/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchsession = dispatch(
          apiService.util.updateQueryData('sessionList', undefined, (draft) => {
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchsession.undo();
        }
      },
    }),
  }),
});

export const {
  useSessionCreateMutation,
  useSessionListQuery,
  useSessionUpdateMutation,
  useSessionDeleteMutation,
  useSessionDropDownQuery,
} = sessionService;
