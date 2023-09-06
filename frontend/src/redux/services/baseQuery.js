//External Lib Import
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Internal Lib Import
import ToastMessage from "../../helpers/ToastMessage";
import { setLoading } from "../slice/settingReducer";
import { setLogout } from "../slice/authReducer";
// https://shy-gray-camel-suit.cyclic.app
// http://localhost:6100
const SERVER_URL =
  process.env.REACT_APP_API_SERVER_URL || "http://localhost:3030";
const API_PREFIX_PATH = process.env.REACT_APP_API_PREFIX_PATH || "/api/v1";

const basefetchBaseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL + API_PREFIX_PATH,
  prepareHeaders: (headers, { getState }) => {
    const {
      settingReducer: { language },
      authReducer: { accessToken, refreshToken },
    } = getState();
    headers.set("authorization", accessToken ? `${accessToken}` : "");
    headers.set("accept-language", language);
    return headers;
  },
});

export const apiService = createApi({
  reducerPath: API_PREFIX_PATH,
  baseQuery: async (args, api, extraOptions) => {
    api.dispatch(setLoading(true));

    const { error, data } = await basefetchBaseQuery(args, api, extraOptions);

    if (error) {
      api.dispatch(setLoading(false));

      if (error.status === 401) {
        api.dispatch(setLogout());

        ToastMessage.errorMessage(error.data?.message);
      } else if (error.status === 404 || error.status === 400) {
        ToastMessage.errorMessage(error.data?.message);
      } else {
        ToastMessage.errorMessage("Sorry, Something went wrong");
      }
      return { error: { status: error.status, data: error.data } };
    }

    if (data) {
      api.dispatch(setLoading(false));

      if (data?.message) {
        ToastMessage.successMessage(data.message);
        delete data.message;
      }
      return { data };
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
