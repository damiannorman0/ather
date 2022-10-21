import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { fetchPairHistorical } from 'api';
import {IPairHistoric} from "api/dataTypes";

export interface PairHistoricalState {
  value: IPairHistoric[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PairHistoricalState = {
  value: [],
  status: 'idle',
};

export const getPairsHistorical = createAsyncThunk(
    'pairHistorical/fetchPairHistorical',
    async (name:string) => {
      try {
        const response = await fetchPairHistorical(name);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
);

export const pairHistoricalSlice = createSlice({
  name: 'pairHistorical',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPairsHistorical.pending, (state) => {
      state.status = 'loading';
    }).addCase(getPairsHistorical.fulfilled, (state, action) => {
      state.status  = 'idle';
      state.value = action.payload as IPairHistoric[];
    }).addCase(getPairsHistorical.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export const selectPairHistorical = (state: RootState) => {
  return state.pairHistorical.value;
}

export default pairHistoricalSlice.reducer;
