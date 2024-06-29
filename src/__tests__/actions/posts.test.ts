/**
 * @file posts.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - ResearchIt All Rights Reserved.
 */

import { combineReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import createMockStore from '../../Store';
import { fetchPosts } from '../../redux/postActions';

describe('Post Actions Test Suite', () => {
  const mock = new MockAdapter(axios);
  let store: ReturnType<typeof createMockStore>;

  const rootReducer = combineReducers({
    post: {
      status: 'idle',
      items: [],
    },
  });

  beforeEach(() => {
    store = createMockStore(rootReducer);
  });

  afterEach(() => {
    mock.reset();
    jest.restoreAllMocks();
  });

  it('should handle fetchPosts.pending', async () => {
    store.dispatch({ type: 'posts/fetchPosts/pending' });
    const actions = store.getActions();

    expect(actions[0].type).toEqual('posts/fetchPosts/pending');
  });

  it('should handle fetchPosts.fulfilled', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];

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

    await store.dispatch(fetchPosts() as any);

    const actions = store.getActions();

    expect(actions[0].type).toBe('posts/fetchPosts/pending');
    expect(actions[1].type).toBe('posts/fetchPosts/fulfilled');
    expect(actions[1].payload).toEqual(mockPosts);
  });

  it('should check fetchPosts data if successed', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockPosts);

    return store.dispatch(fetchPosts() as any).then((res) => {
      expect(res.payload).toEqual(mockPosts);
    });
  });

  it('should check fetchPosts data if failed 1', async () => {
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(404);

    return store.dispatch(fetchPosts() as any).catch((result) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.message).toContain('404');
    });
  });

  it.skip('should check fetchPosts data if failed 2', async () => {
    const errorMessage = 'Internal Server Error';

    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(500, {
      message: errorMessage,
    });

    return store.dispatch(fetchPosts() as any).catch((result) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.message).toEqual(errorMessage);
    });
  });
});
