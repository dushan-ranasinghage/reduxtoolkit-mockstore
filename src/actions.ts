/**
 * @file actions.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - ResearchIt All Rights Reserved.
 */

import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error('Error occured while loading fetchPosts', error.message);
  }
});
