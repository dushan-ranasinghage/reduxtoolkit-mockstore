/**
 * @file rootReducer.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { combineReducers } from '@reduxjs/toolkit';

import postSlice from './postSlice';

const appReducer = combineReducers({
  posts: postSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
