# reduxtoolkit-mockstore

A lightweight mock store utility for testing Redux Toolkit applications. Works seamlessly with both JavaScript and TypeScript projects.

## Installation

```bash
npm install reduxtoolkit-mockstore
# or
yarn add reduxtoolkit-mockstore
```

## Features

- ✅ Works with both JavaScript and TypeScript
- ✅ Supports Redux Toolkit's `combineReducers` and `createSlice`
- ✅ Tracks all dispatched actions
- ✅ Supports async thunks and action creators
- ✅ Type-safe with full TypeScript support
- ✅ Lightweight and easy to use

## Quick Start

### TypeScript

```typescript
import { createMockStore, MockStore } from 'reduxtoolkit-mockstore';
import { combineReducers } from '@reduxjs/toolkit';
import rootReducer from './reducers';

describe('My Test Suite', () => {
  let store: MockStore;

  beforeEach(() => {
    store = createMockStore(rootReducer);
  });

  it('should dispatch actions', () => {
    store.dispatch({ type: 'counter/increment' });
    
    const actions = store.getActions();
    expect(actions[0].type).toBe('counter/increment');
    
    const state = store.getState();
    expect(state.counter.value).toBe(1);
  });
});
```

### JavaScript

```javascript
const { createMockStore } = require('reduxtoolkit-mockstore');
const { combineReducers } = require('@reduxjs/toolkit');
const rootReducer = require('./reducers');

describe('My Test Suite', () => {
  let store;

  beforeEach(() => {
    store = createMockStore(rootReducer);
  });

  it('should dispatch actions', () => {
    store.dispatch({ type: 'counter/increment' });
    
    const actions = store.getActions();
    expect(actions[0].type).toBe('counter/increment');
    
    const state = store.getState();
    expect(state.counter.value).toBe(1);
  });
});
```

## API

### `createMockStore(rootReducer, initialState?)`

Creates a mock Redux store for testing.

**Parameters:**
- `rootReducer` (Reducer): The root reducer function (usually from `combineReducers`)
- `initialState` (optional): Initial state object

**Returns:** `MockStore` object with:
- `getState()`: Returns the current state
- `dispatch(action)`: Dispatches an action and updates state (supports both plain actions and thunks)
- `getActions()`: Returns array of all dispatched actions
- `clearActions()`: Clears the actions array

### `mockStore(initialState)`

Alternative API that works with initial state directly (uses Redux Toolkit's `configureStore` internally).

## Examples

See the `examples/` directory for complete working examples in both TypeScript and JavaScript.

## Testing

```bash
npm test
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.