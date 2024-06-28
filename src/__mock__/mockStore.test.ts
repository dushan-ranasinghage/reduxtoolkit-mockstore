/**
 * @file mockStore.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { combineReducers } from '@reduxjs/toolkit';
import createMockStore from './mockStore';
import { fetchPosts } from '../redux/postActions';

describe.skip('Post Slice Tests', () => {
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
    expect(actions[1].payload).toEqual(mockPosts);
  });

  it('should handle fetchPosts action', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];

    // Mock the axios.get call
    jest.mock('axios', () => ({
      get: jest.fn().mockResolvedValue({ data: mockPosts }),
    }));

    // Dispatch the fetchPosts action
    await store.dispatch(fetchPosts() as any);

    // Check the dispatched actions
    const actions = store.getActions();
    expect(actions[0].type).toBe('posts/fetchPosts/pending');
    expect(actions[1].type).toBe('posts/fetchPosts/fulfilled');
    expect(actions[1].payload).toEqual(mockPosts);

    // Check the final state
    const state = store.getState();
    expect(state.post.status).toBe('fulfilled');
    expect(state.post.items).toEqual(mockPosts);
  });

  it('should handle initial state', () => {
    const state = store.getState();
    expect(state.post).toEqual({
      status: 'idle',
      items: [],
    });
  });

  it('should handle custom initial state', () => {
    const customInitialState: any = combineReducers({
      post: {
        status: 'fulfilled',
        items: [{ id: 1, title: 'Initial Post' }],
      },
    });

    const customStore = createMockStore(customInitialState);
    const state = customStore.getState();
    expect(state.post).toEqual(customInitialState.post);
  });
});
