import {ITrade} from "api/dataTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "store/store";

export interface BuySellState {
    value: ITrade[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: BuySellState = {
    value: [],
    status: 'idle',
};

export const BUY:string = "buy";
export const SELL:string = "sell";


export const buySellSlice = createSlice({
    name: 'buySell',
    initialState,
    reducers: {
        setBuySell: (state, action:PayloadAction<ITrade>) => {
            state.value = [...state.value, action.payload];
        },
    },
});

export const { setBuySell } = buySellSlice.actions;

export const getBuySell = (state: RootState) => {
    return state.buySell.value;
}

export default buySellSlice.reducer;


