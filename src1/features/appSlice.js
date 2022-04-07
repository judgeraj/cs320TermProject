import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    discussionId: null,
    discussionName: null,
  },
  reducers: {
    setDiscussionId: (state, action) => {
      state.user += action.payload;
    },
  },
});

export const { setDiscussionId } = appSlice.actions;
export const selectDiscussionId =  (state) => state.app.discussionId;
export const selectDiscussionName = (state) => state.app.selectDiscussionName;
export default appSlice.reducer;
