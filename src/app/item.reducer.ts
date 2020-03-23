import { createReducer, on } from '@ngrx/store';
import { getAll, loaded } from './item.actions';

import Item from './item';

export const initialState: Item[] = [];

const TEST_ITEM = new Item({
  "id": "001",
  "name": "16lb bag of Skittles",
  "price": 16.00,
  "isImported": false,
  "types": [ "candy" ],
  "image": "/assets/skittles.jpg"
});

const _itemReducer = createReducer(initialState,
  // on(getAll, state => [TEST_ITEM]), // TODO
  on(loaded, (state, { items }) => items )
);

export function itemReducer(state, action) {
  return _itemReducer(state, action);
}
