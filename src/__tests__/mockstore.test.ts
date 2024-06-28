/**
 * @file mockstore.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import store from '../redux/store';
import { fetchPosts } from '../redux/postActions';

describe('Mock Store Test Suite', () => {
  it('Test real store', async () => {
    await store.dispatch(fetchPosts());

    const state = store.getState();
    const postsLength = state.posts.items.length;
    expect(postsLength).toEqual(100);
  });
});
