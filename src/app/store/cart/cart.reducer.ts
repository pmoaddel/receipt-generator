import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from './cart.actions';

import Item from '../../item';

export interface CartItem {
  item: Item;
  count: number;
}

export const initialState: Map<string, CartItem> = new Map();

const _cartReducer = createReducer(initialState,
  on(addItem, (state, { item }) => {
    let newState = new Map(state);
    let cartItem: CartItem = newState.get(item.id);
    if (cartItem) {
      cartItem.count++;
      newState.set(item.id, cartItem);
    } else {
      newState.set(item.id, {item, count: 1});
    }
    return newState;
  }),
  on(removeItem, (state, { item }) => {
    let newState = new Map(state);
    const itemID = item.id;
    let cartItem: CartItem = newState.get(itemID);
    if (cartItem.count === 1) {
      newState.delete(itemID);
      return newState;
    }
    cartItem.count--;
    newState.set(itemID, cartItem);
    return newState;
  }),
);

export function cartReducer(state, action) {
  return _cartReducer(state, action);
}
