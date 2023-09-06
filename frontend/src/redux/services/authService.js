//External import
import SessionHelper from "../../helpers/SessionHelper";
import { setLogin } from "../slice/authReducer";
import { apiService } from "./baseQuery";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);

          /*
           * set token localStorage
           */
          // dispatch(setLogin(result.data?.accessToken));
        } catch (err) {
          console.log(err.error.data.error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          /*
           * set token localStorage
           */
          dispatch(setLogin(result.data?.accessToken));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ email, otp }) => ({
        url: `auth/verifyEmail?otp=${otp}`,
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, email, otp }) => ({
        url: `auth/resetPassword?otp=${otp}`,
        method: "POST",
        body: {
          password,
          email,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          SessionHelper.ResetOtp();
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authService;
