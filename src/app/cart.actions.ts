import { createAction, props } from '@ngrx/store';

import Item from './item';

export const addItem = createAction('[Inventory Component] Add Item', props<{item: Item}>());
export const removeItem = createAction('[Inventory Component] Remove Item', props<{item: Item}>());
