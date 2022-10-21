import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {RootState, store} from "store/store";
import { fetchPairs } from "api";
import {IPair, IPairUpdate} from "api/dataTypes";

export interface PairsState {
  value: IPair[];
  status: "idle" | "loading" | "failed";
}

const initialState: PairsState = {
  value: [],
  status: "idle",
};

export const getPairs = createAsyncThunk(
    "pairs/fetchPairs",
    async () => {
      try {
        return await fetchPairs();
      } catch (error) {
        console.error(error);
      }
    }
);

export const updatePairs = createAsyncThunk(
    "pairs/updatePairs",
    async (latest:any) => {

      try {
        if(store.getState().pairs.value.length === 0) {
          return store.getState().pairs.value;
        }

        return store.getState().pairs.value.reduce((total:any, item:IPair) => {
          const latestItem:IPairUpdate = latest[item.name] as IPairUpdate;
          const updated:IPair =  {
            ...item,
            price: (latestItem?.price || item.price),
          };

          return [
            ...total,
            updated,
          ]
        }, []) || [];

      } catch (error) {
        console.error(error);
      }
    }
);

export const pairsSlice = createSlice({
  name: "pairs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPairs.pending, (state) => {
      state.status = "loading";
    }).addCase(getPairs.fulfilled, (state, action) => {
      state.status  = "idle";
      state.value = action.payload as IPair[];

    }).addCase(getPairs.rejected, (state) => {
      state.status = "failed";
      console.warn("getPairs fail");

    }).addCase(updatePairs.fulfilled, (state, action) => {
      state.value = action.payload as IPair[];
    });
  }
});

export const selectPairs = (state: RootState) => {
  return state.pairs.value;
}


export default pairsSlice.reducer;
