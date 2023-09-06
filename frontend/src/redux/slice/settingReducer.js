//External Lib Import
import { createSlice } from '@reduxjs/toolkit';

//Internal Lib Import
import SessionHelper from '../../helpers/SessionHelper';

const settingSlice = createSlice({
  name: 'settingReducer',
  initialState: {
    language: SessionHelper.GetLanguage(),
    isLoading: false,
  },
  reducers: {
    changeLanguage(state, action) {
      SessionHelper.SetLanguage(action.payload);
      state.language = SessionHelper.GetLanguage();
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { changeLanguage, setLoading } = settingSlice.actions;

export default settingSlice.reducer;
