import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ItemActions from './item.actions';

import Item from './item';

export interface State extends EntityState<Item> {
  loaded: boolean;
  // additional entities state properties
}

export function selectItemId(a: Item): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: Item, b: Item): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: selectItemId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // Additional entity state properties
  loaded: false,
  error: null
});

const _reducer = createReducer(
  initialState,
  on(ItemActions.loadItems, (state, { items }) => {
    state.loaded = true;
    return adapter.addAll(items, state);
  }),
  on(ItemActions.addItem, (state, { item }) => {
    return adapter.addOne(item, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}
