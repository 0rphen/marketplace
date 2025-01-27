import { Injectable, computed, inject, signal } from '@angular/core';
import { ICartItem } from '../interfaces/cart-item.interface';
import { ProductFacade } from './product.facade';

@Injectable({
  providedIn: 'root'
})
export class CartFacade {
  private _products = inject(ProductFacade).products;

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
    this._cart.update((cart) => [...cart.filter((item) => item.id != id)]);
  }

  get products() {
    return computed(() => {
      const ids = this._cart().map((item) => item.id)
      const products = this._products()?.filter((product) => ids.includes(product.id)) || [];
      return products.map((product) => {
        const amount = this._cart().find((cart) => cart.id == product.id)?.amount;
        return {...product, amount };
      })
    })
  }
}
