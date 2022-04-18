import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    topicId: null,
    topicName: null,
  },
  reducers: {
    setTopic: (state, action) => {
      state.topicId = action.payload.topicId;
      state.topicName = action.payload.topicName;
    },
  },
});

export const { setTopic } = appSlice.actions;
export const selectTopicId =  (state) => state.app.topicId;
export const selectTopicName = (state) => state.app.topicName;
export default appSlice.reducer;
