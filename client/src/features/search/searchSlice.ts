import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './searchAPI';

export interface SearchState {
  results: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchState = {
  results: '',
  status: 'idle',
};


export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<string>) => {
      state.results = action.payload;
    },

  },

});

export const { setResults } = searchSlice.actions;

export default searchSlice.reducer;
