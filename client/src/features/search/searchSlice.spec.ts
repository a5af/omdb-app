import searchReducer, {
  SearchState,
} from './searchSlice';

describe('search reducer', () => {
  
  it('should handle initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });


});
