//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

//Internal Lib Import
import SessionHelper from "../../helpers/SessionHelper";

const authSlice = createSlice({
  name: "authReducer",
  initialState: {
    accessToken: SessionHelper.GetToken() || undefined,
    userDetails:
      SessionHelper.GetToken() && jwt_decode(SessionHelper.GetToken()),
  },
  reducers: {
    setLogin: (state, action) => {
      SessionHelper.SetToken(action.payload);
      state.accessToken = SessionHelper.GetToken() || undefined;
      state.userDetails =
        SessionHelper.GetToken() && jwt_decode(SessionHelper.GetToken());
    },
    setLogout: (state, action) => {
      window.location.href = "/login";
      SessionHelper.RemoveToken();
      state.accessToken = undefined;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
