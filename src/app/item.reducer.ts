import { createReducer, on } from '@ngrx/store';
import { getAll, loaded } from './item.actions';

import Item from './item';

export const initialState: Item[] = [];

const _itemReducer = createReducer(initialState,
  on(loaded, (state, { items }) => items )
);

export function itemReducer(state, action) {
  return _itemReducer(state, action);
}
