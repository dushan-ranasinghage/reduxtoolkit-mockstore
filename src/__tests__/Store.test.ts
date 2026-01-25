/**
 * @file Store.test.ts
 * @description Tests for createMockStore
 * @author Dushan Ranasinghage
 * @copyright Copyright 2026 - Dushan Ranasinghage All Rights Reserved.
 */

import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { createMockStore, MockStore } from '../index';

interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [] } as TodosState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: state.items.length + 1,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  todos: todosSlice.reducer,
});

describe('createMockStore', () => {
  describe('Basic functionality', () => {
    it('should create a mock store with default state', () => {
      const store = createMockStore(rootReducer);
      const state = store.getState();

      expect(state.counter.value).toBe(0);
      expect(state.todos.items).toEqual([]);
    });

    it('should create a mock store with initial state', () => {
      const initialState = {
        counter: { value: 10 },
        todos: { items: [] },
      };

      const store = createMockStore(rootReducer, initialState);
      const state = store.getState();

      expect(state.counter.value).toBe(10);
    });

    it('should return MockStore interface', () => {
      const store = createMockStore(rootReducer);

      expect(store).toHaveProperty('getState');
      expect(store).toHaveProperty('dispatch');
      expect(store).toHaveProperty('getActions');
      expect(store).toHaveProperty('clearActions');
      expect(typeof store.getState).toBe('function');
      expect(typeof store.dispatch).toBe('function');
      expect(typeof store.getActions).toBe('function');
      expect(typeof store.clearActions).toBe('function');
    });
  });

  describe('Action dispatching', () => {
    let store: MockStore;

    beforeEach(() => {
      store = createMockStore(rootReducer);
    });

    it('should dispatch actions and track them', () => {
      store.dispatch(counterSlice.actions.increment());

      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0].type).toBe('counter/increment');
    });

    it('should update state when dispatching actions', () => {
      store.dispatch(counterSlice.actions.increment());

      const state = store.getState();
      expect(state.counter.value).toBe(1);
    });

    it('should track multiple actions', () => {
      store.dispatch(counterSlice.actions.increment());
      store.dispatch(counterSlice.actions.increment());
      store.dispatch(counterSlice.actions.incrementByAmount(5));

      const actions = store.getActions();
      expect(actions).toHaveLength(3);

      const state = store.getState();
      expect(state.counter.value).toBe(7);
    });

    it('should handle actions with payload', () => {
      store.dispatch(counterSlice.actions.incrementByAmount(10));

      const actions = store.getActions();
      expect(actions[0].payload).toBe(10);

      const state = store.getState();
      expect(state.counter.value).toBe(10);
    });

    it('should handle multiple slices', () => {
      store.dispatch(counterSlice.actions.increment());
      store.dispatch(todosSlice.actions.addTodo('Test todo'));

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0].type).toBe('counter/increment');
      expect(actions[1].type).toBe('todos/addTodo');

      const state = store.getState();
      expect(state.counter.value).toBe(1);
      expect(state.todos.items).toHaveLength(1);
      expect(state.todos.items[0].text).toBe('Test todo');
    });
  });

  describe('getActions', () => {
    let store: MockStore;

    beforeEach(() => {
      store = createMockStore(rootReducer);
    });

    it('should return empty array initially', () => {
      const actions = store.getActions();
      expect(actions).toEqual([]);
    });

    it('should return all dispatched actions', () => {
      store.dispatch(counterSlice.actions.increment());
      store.dispatch(counterSlice.actions.decrement());
      store.dispatch(todosSlice.actions.addTodo('Todo 1'));

      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0].type).toBe('counter/increment');
      expect(actions[1].type).toBe('counter/decrement');
      expect(actions[2].type).toBe('todos/addTodo');
    });
  });

  describe('clearActions', () => {
    let store: MockStore;

    beforeEach(() => {
      store = createMockStore(rootReducer);
    });

    it('should clear all tracked actions', () => {
      store.dispatch(counterSlice.actions.increment());
      store.dispatch(counterSlice.actions.decrement());

      expect(store.getActions()).toHaveLength(2);

      store.clearActions();
      expect(store.getActions()).toHaveLength(0);
    });

    it('should not affect state when clearing actions', () => {
      store.dispatch(counterSlice.actions.increment());
      store.dispatch(counterSlice.actions.increment());

      const stateBefore = store.getState();
      store.clearActions();
      const stateAfter = store.getState();

      expect(stateBefore.counter.value).toBe(2);
      expect(stateAfter.counter.value).toBe(2);
    });
  });

  describe('Async thunks', () => {
    let store: MockStore;

    beforeEach(() => {
      store = createMockStore(rootReducer);
    });

    it('should handle async thunk actions', async () => {
      const asyncThunk = async (dispatch: any) => {
        dispatch(counterSlice.actions.increment());
        await new Promise((resolve) => setTimeout(resolve, 10));
        dispatch(counterSlice.actions.increment());
        return { type: 'thunk/completed' };
      };

      await store.dispatch(asyncThunk as any);

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0].type).toBe('counter/increment');
      expect(actions[1].type).toBe('counter/increment');

      const state = store.getState();
      expect(state.counter.value).toBe(2);
    });
  });

  describe('State management', () => {
    it('should maintain state across multiple dispatches', () => {
      const store = createMockStore(rootReducer);

      store.dispatch(counterSlice.actions.increment());
      expect(store.getState().counter.value).toBe(1);

      store.dispatch(counterSlice.actions.increment());
      expect(store.getState().counter.value).toBe(2);

      store.dispatch(counterSlice.actions.incrementByAmount(5));
      expect(store.getState().counter.value).toBe(7);
    });

    it('should handle complex state updates', () => {
      const store = createMockStore(rootReducer);

      store.dispatch(todosSlice.actions.addTodo('First todo'));
      store.dispatch(todosSlice.actions.addTodo('Second todo'));
      store.dispatch(todosSlice.actions.toggleTodo(1));

      const state = store.getState();
      expect(state.todos.items).toHaveLength(2);
      expect(state.todos.items[0].completed).toBe(true);
      expect(state.todos.items[1].completed).toBe(false);
    });
  });
});
