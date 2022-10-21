import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import {IPair} from "../../api/dataTypes";

export interface SelectedPairState {
  value: IPair | undefined;
}

const initialState: SelectedPairState = {
  value: undefined
};

export const selectedPairSlice = createSlice({
  name: 'selectedPair',
  initialState,
  reducers: {
    select: (state, action:PayloadAction<IPair>) => {
      state.value = action.payload;
    },
  },
});

export const { select } = selectedPairSlice.actions;

export const selectSelectedPair = (state: RootState) => {
  return state.selectedPair.value;
}

export default selectedPairSlice.reducer;
