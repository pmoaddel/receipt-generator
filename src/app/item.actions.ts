import { createAction, props } from '@ngrx/store';

import Item from './item';

export const getAll = createAction('[Inventory Component] GetAll');
export const loaded = createAction('[Items API] Items Loaded Success', props<{items: Item[]}>());
