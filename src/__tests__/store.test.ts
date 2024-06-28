import store from '../redux/store';
import { fetchPosts } from '../redux/postActions';

describe('Test Real Store', () => {
  it('Should receive 100 posts', async () => {
    await store.dispatch(fetchPosts());

    const state = store.getState();
    const postsLength = state.posts.items.length;
    expect(postsLength).toEqual(100);
  });
});
