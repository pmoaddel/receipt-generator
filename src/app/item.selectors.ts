import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromItem from './item.reducer';

export interface State {
  items: fromItem.State;
}

export const reducers: ActionReducerMap<State> = {
  items: fromItem.reducer,
};

export const selectItemState = createFeatureSelector<fromItem.State>('items');

// export const selectItemIds = createSelector(
//   selectItemState,
//   fromItem.selectItemIds // shorthand for itemsState => fromItem.selectItemIds(itemsState)
// );
// export const selectItemEntities = createSelector(
//   selectItemState,
//   fromItem.selectItemEntities
// );
// export const selectAllItems = createSelector(
//   selectItemState,
//   fromItem.selectAllItems
// );
// export const selectItemTotal = createSelector(
//   selectItemState,
//   fromItem.selectItemTotal
// );
// export const selectCurrentItemId = createSelector(
//   selectItemState,
//   fromItem.getSelectedItemId
// );

// export const selectCurrentItem = createSelector(
//   selectItemEntities,
//   selectCurrentItemId,
//   (itemEntities, itemId) => itemEntities[itemId]
// );
