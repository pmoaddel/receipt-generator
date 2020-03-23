import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ItemService } from './services/item.service';

import { getAll } from './item.actions';

@Injectable()
export class ItemEffects {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(getAll.type),
    mergeMap(() => this.itemService.getAll()
      .pipe(
        map(items => ({ type: '[Items API] Items Loaded Success', items })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}
}
