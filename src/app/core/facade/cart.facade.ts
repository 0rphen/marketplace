import { Injectable, computed, signal } from '@angular/core';
import { ICartItem } from '../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartFacade {
  private _cart = signal<ICartItem[]>([]);

  get cart() {
    return this._cart;
  }

  get size() {
    return computed(() => this._cart().reduce((acc, cur) => acc + cur.amount, 0));
  }

  setCartItem(item: ICartItem) {
    const index = this._cart().findIndex((cartItem) => cartItem.id === item.id);
    (index >= 0)
      ? this._cart.update((items) => {
        items[index].amount = item.amount
        return items;
      })
      : this._cart.update((items) => [...items, item]);
  }

  removeCartItem(id: number) {
    const index = this._cart().findIndex((item) => item.id === id);
    this._cart.update((items) => [...items.splice(index, 1)]);
  }
}
