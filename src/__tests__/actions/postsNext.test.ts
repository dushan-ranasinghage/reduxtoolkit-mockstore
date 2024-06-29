/**
 * @file posts.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - ResearchIt All Rights Reserved.
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import mockStore from '../../StoreNext';
import { fetchPosts } from '../../redux/postActions';
import { INITIAL_STATE } from '../../redux/postSlice';

describe('Post Actions Test Suite', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
    jest.restoreAllMocks();
  });

  it('should handle fetchPosts.pending', async () => {
    const store = mockStore(INITIAL_STATE);

    store.dispatch({ type: 'posts/fetchPosts/pending' });

    const actions = store.getActions();

    expect(actions[0].type).toEqual('posts/fetchPosts/pending');
  });

  it('should handle fetchPosts.fulfilled', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];

    const store = mockStore(INITIAL_STATE);

    store.dispatch({
      type: 'posts/fetchPosts/fulfilled',
      payload: mockPosts,
    });

    const actions = store.getActions();

    expect(actions[0].type).toEqual('posts/fetchPosts/fulfilled');
    expect(actions[0].payload).toEqual(mockPosts);
  });

  it('should handle fetchPosts action', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockPosts);

    const store = mockStore(INITIAL_STATE);

    await store.dispatch(fetchPosts() as any);

    const actions = store.getActions();

    expect(actions[0].type).toBe('posts/fetchPosts/pending');
    expect(actions[1].type).toBe('posts/fetchPosts/fulfilled');
    expect(actions[1].payload).toEqual(mockPosts);
  });

  it('should check fetchPosts data if successed', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockPosts);

    const store = mockStore(INITIAL_STATE);

    return store.dispatch(fetchPosts() as any).then((res) => {
      expect(res.payload).toEqual(mockPosts);
    });
  });

  it('should check fetchPosts data if failed 1', async () => {
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(404);

    const store = mockStore(INITIAL_STATE);

    return store.dispatch(fetchPosts() as any).catch((result) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.message).toContain('404');
    });
  });

  it('should check fetchPosts data if failed 2', async () => {
    const errorMessage = 'Internal Server Error';

    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(500, {
      message: errorMessage,
    });

    const store = mockStore(INITIAL_STATE);

    return store
      .dispatch(fetchPosts() as any)
      .unwrap()
      .catch((result) => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result.message).toEqual(errorMessage);
      });
  });
});
