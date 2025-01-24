import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ProductsService } from '../../../core/services/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class LandingFacade {
  private _productsService = inject(ProductsService);
  private _categories = toSignal(this._productsService.getCategories());
  private _products = toSignal(this._productsService.getProducts());

  private _filter = signal('');

  initUi() {}

  get categories() {
    return this._categories;
  }

  get products() {
    return computed(() => {
      return (this._filter() != '')
        ? this._products()?.filter((product) => product.title.includes(this._filter()))
        : this._products();
    })
  }

  set filter(f: string) {
    this._filter.set(f);
  }
}
