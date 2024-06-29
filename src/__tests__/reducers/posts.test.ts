/**
 * @file posts.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import postsReducer, { INITIAL_STATE } from '../../redux/postSlice';

describe('Post Reducer Test Suite', () => {
  it('Returns the initial posts state', () => {
    const state = postsReducer.reducer(undefined, {
      type: 'UnknownAction',
    });
    expect(state).toEqual(INITIAL_STATE);
  });

  it('Returns the fetch posts loading state', () => {
    const state = postsReducer.reducer(
      {
        ...INITIAL_STATE,
      },
      {
        type: 'posts/fetchPosts/pending',
      },
    );
    expect(state).toEqual({
      ...INITIAL_STATE,
      status: 'loading',
    });
  });

  it('Returns the fetch posts success state', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];

    const state = postsReducer.reducer(
      {
        ...INITIAL_STATE,
        status: 'loading',
      },
      {
        type: 'posts/fetchPosts/fulfilled',
        payload: mockPosts,
      },
    );

    expect(state).toEqual({
      ...INITIAL_STATE,
      status: 'finished',
      items: mockPosts,
    });
  });

  it('Returns the fetch posts failed state', () => {
    const errorMessage = 'Request failed with 404';

    const state = postsReducer.reducer(
      {
        ...INITIAL_STATE,
        status: 'loading',
      },
      {
        type: 'posts/fetchPosts/rejected',
        error: {
          message: errorMessage,
        },
      },
    );

    expect(state).toEqual({
      ...INITIAL_STATE,
      status: 'error',
      error: errorMessage,
    });
  });
});
