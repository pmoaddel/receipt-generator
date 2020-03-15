import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

import * as fromItemActions from "./item.actions";
import { ItemService } from "./item.service";
import Item from './item';

@Injectable()
export class ItemEffects {
  loadEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Item] Load Items'),
      switchMap(() =>
        this.itemService.findAll().pipe(
          map((items: Item[]) =>
            fromItemActions.loadItems({
              items
            })
          ),
          catchError(() => of({ type: '[Item] Item Loaded Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}
}
