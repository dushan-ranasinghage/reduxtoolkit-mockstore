import store from '../redux/store';
import { fetchPosts } from '../redux/postActions';

describe('Redux Test', () => {
  it('Test real store', async () => {
    await store.dispatch(fetchPosts());

    const state = store.getState();
    const postsLength = state.posts.items.length;
    expect(postsLength).toEqual(100);
  });
});
