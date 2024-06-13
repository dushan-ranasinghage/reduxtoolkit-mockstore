import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import mockStore from '../Store';
import { fetchPosts } from '../actions';

describe('Mock Store Test Suite', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
    jest.resetAllMocks();
  });

  const payload = [{ id: 1 }, { id: 2 }];

  test('store test', () => {
    mock.onGet('https://test/posts').reply(200, payload);

    const store = mockStore({});

    return store
      .dispatch(fetchPosts())
      .unwrap()
      .then((res: any) => {
        expect(res.data).toMatchObject(payload);
      });
  });
});
