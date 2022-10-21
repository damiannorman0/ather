import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import {IPair} from "../../api/dataTypes";

export interface IPinnedState {
  value: IPair[];
}

const initialState:IPinnedState = {
  value: []
};

export const pinnedSlice = createSlice({
  name: 'pinnedPairs',
  initialState,
  reducers: {
    setPinned: (state, action:PayloadAction<[IPair]>) => {
      state.value = action.payload;
    },
  },
});

export const { setPinned } = pinnedSlice.actions;

export const getPinned = (state: RootState) => {
  return state.pinned.value;
}

export default pinnedSlice.reducer;
