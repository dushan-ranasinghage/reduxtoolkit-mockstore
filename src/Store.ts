/**
 * @file StoreNext.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { UnknownAction, Reducer } from '@reduxjs/toolkit';

interface MockStore {
  getState: () => any;
  dispatch: (action: UnknownAction | any) => Promise<UnknownAction>;
  getActions: () => UnknownAction[];
  clearActions: () => void;
}

const createMockStore = (rootReducer: Reducer<any, UnknownAction>, initialState?: Partial<any>): MockStore => {
  let state: any = rootReducer(initialState as any, {
    type: 'INIT',
  });

  let actions: UnknownAction[] = [];

  const store: MockStore = {
    getState: () => state,
    dispatch: async (action: UnknownAction | any) => {
      if (typeof action === 'function') {
        const result = await (action as any)(store.dispatch, store.getState);
        return result;
      }
      actions.push(action as UnknownAction);
      state = rootReducer(state, action as UnknownAction);
      return action as UnknownAction;
    },
    getActions: () => actions,
    clearActions: () => {
      actions = [];
    },
  };

  return store;
};

// Export the createMockStore function
export default createMockStore;
