# reduxtoolkit-mockstore

A simple mock store for testing Redux Toolkit apps. No setup, no hassle - just pass your reducer and start testing.

## Why?

Testing Redux can be annoying. You need to set up a store, configure middleware, handle async thunks... it's a lot. This package gives you a mock store that works exactly like the real thing, but without all the ceremony.

## Install

```bash
npm install reduxtoolkit-mockstore
```

## Usage

### Basic example

```typescript
import { createMockStore } from 'reduxtoolkit-mockstore';
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todosSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

describe('My component', () => {
  it('dispatches actions correctly', () => {
    const store = createMockStore(rootReducer);
    
    store.dispatch({ type: 'counter/increment' });
    
    // Check what actions were dispatched
    const actions = store.getActions();
    expect(actions[0].type).toBe('counter/increment');
    
    // Check the state
    const state = store.getState();
    expect(state.counter.value).toBe(1);
  });
});
```

### With initial state

Sometimes you want to start with a specific state:

```typescript
const store = createMockStore(rootReducer, {
  counter: { value: 10 },
  todos: { items: [] }
});
```

### Testing async thunks

Works with async thunks too:

```typescript
it('handles async thunks', async () => {
  const store = createMockStore(rootReducer);
  
  await store.dispatch(fetchUserData());
  
  const actions = store.getActions();
  expect(actions[0].type).toBe('user/fetch/pending');
  expect(actions[1].type).toBe('user/fetch/fulfilled');
});
```

### Clearing actions between tests

```typescript
beforeEach(() => {
  store = createMockStore(rootReducer);
});

it('test 1', () => {
  store.dispatch(someAction());
  expect(store.getActions()).toHaveLength(1);
});

it('test 2', () => {
  // Actions are cleared automatically with new store
  // Or manually:
  store.clearActions();
  expect(store.getActions()).toHaveLength(0);
});
```

## API

### `createMockStore(rootReducer, initialState?)`

Creates a mock store. Pass your root reducer (from `combineReducers`) and optionally an initial state.

**Returns a store with:**

- `getState()` - Get the current state
- `dispatch(action)` - Dispatch an action (works with plain actions and thunks)
- `getActions()` - Get all dispatched actions
- `clearActions()` - Clear the actions array

## TypeScript

Full TypeScript support included:

```typescript
import { createMockStore, MockStore } from 'reduxtoolkit-mockstore';

let store: MockStore;

beforeEach(() => {
  store = createMockStore(rootReducer);
});
```

## JavaScript

Works in plain JavaScript too:

```javascript
const { createMockStore } = require('reduxtoolkit-mockstore');

const store = createMockStore(rootReducer);
```

## That's it

No configuration, no middleware setup, no extra dependencies (besides `@reduxjs/toolkit`). Just create a store and test your Redux code.

## License

MIT
