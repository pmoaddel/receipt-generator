import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import Item from '../item'


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemUrl: string = '/assets/items.json';
  private _items: Item[] = [];

  constructor(private http: HttpClient) {
  }


  load(): Observable<any> {
    return this.http.get(this.itemUrl).pipe(
      tap(_ => console.log('loaded items')),
      map((response: any) => {
        response.entities.forEach((itemJson: any) => {
          this._items.push(new Item(itemJson));
        });
        return this._items;
      })
    );
  }

  getAll(): Observable<Item[]> {
    const items$ : Observable<Item[]> = this._items.length ? of(this._items) : this.load();
    return items$.pipe(
      map((items) => {
        return items.slice();
      }));
  }
}
