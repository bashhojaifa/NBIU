//Internal Lib Import
import { apiService } from './baseQuery';

export const profileService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    profileDetails: builder.query({
      query: () => ({
        url: 'profile/profileDetails',
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: (postBody) => ({
        url: 'profile/updateProfile',
        method: 'PATCH',
        body: postBody,
      }),
    }),
    studentList: builder.query({
      query: () => ({
        url: 'profile',
        method: 'GET',
      }),
    }),
  }),
});
export const { useProfileDetailsQuery, useUpdateProfileMutation, useStudentListQuery } = profileService;
