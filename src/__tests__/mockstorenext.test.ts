/**
 * @file mockstorenext.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { combineReducers } from '@reduxjs/toolkit';

import createMockStore from '../StoreNext';
import { fetchPosts } from '../redux/postActions';

describe('Mock Store Next Test Suite', () => {
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
});
