import { createAction, props } from '@ngrx/store';

import Item from './item';

export const loadItems = createAction('[Item] Load Items', props<{ items: Item[] }>());
export const addItem = createAction('[Item] Add Item', props<{ item: Item }>());
