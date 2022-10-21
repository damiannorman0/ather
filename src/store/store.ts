import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pairsReducer from 'slices/pairs/pairsSlice';
import selectedPairReducer from 'slices/selectedPair/selectedPairSlice';
import pairHistoricalReducer from 'slices/pairHistoical/pairHistoricalSlice';
import pinnedReducer from 'slices/pinned/pinnedSlice';
import buySellReducer from 'slices/buySell/buySellSlice';



export const store = configureStore({
  reducer: {
    pairs: pairsReducer,
    selectedPair: selectedPairReducer,
    pairHistorical: pairHistoricalReducer,
    pinned: pinnedReducer,
    buySell: buySellReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
