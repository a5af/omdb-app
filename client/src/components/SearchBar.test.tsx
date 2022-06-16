import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import SearchBar from './SearchBar';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    searchReducer,
  },
});

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Provider store={store}>
      <SearchBar API={'http://fake'} />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
