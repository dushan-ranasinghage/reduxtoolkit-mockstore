/**
 * @file postSlice.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { createSlice } from '@reduxjs/toolkit';

import { fetchPosts } from './postActions';

export interface IPostsState {
  items: Array<any>;
  status: 'idle' | 'loading' | 'finished' | 'error';
  error: any;
}

const INITIAL_STATE = {
  items: [],
  status: 'idle',
  error: null,
} as IPostsState;

export const postsSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'finished';
      state.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export default postsSlice;
