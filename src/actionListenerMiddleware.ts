/**
 * @file actionListenerMiddleware.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - ResearchIt All Rights Reserved.
 */

import { createListenerMiddleware } from '@reduxjs/toolkit';

const actionListenerMiddleware = createListenerMiddleware();

actionListenerMiddleware.startListening({
  predicate: () => true, // Always return true to listen to all actions
  effect: async (action, listenerApi) => {
    console.log('Action dispatched:', action.type, listenerApi);
  },
});

export default actionListenerMiddleware;
