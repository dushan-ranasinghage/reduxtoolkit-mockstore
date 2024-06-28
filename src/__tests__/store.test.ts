/**
 * @file store.test.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import store from '../redux/store';
import { fetchPosts } from '../redux/postActions';

describe('Store Test Suite', () => {
  it('Should receive 100 posts', async () => {
    await store.dispatch(fetchPosts());

    const state = store.getState();
    const postsLength = state.posts.items.length;
    expect(postsLength).toEqual(100);
  });
});
