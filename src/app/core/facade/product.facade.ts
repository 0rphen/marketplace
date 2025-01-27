import { Injectable, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  private _productsService = inject(ProductsService);
  private _categories = toSignal(this._productsService.getCategories().
    pipe(map((categories) => ['all', ...categories])));
  private _products = toSignal(this._productsService.getProducts());

  private _filter = signal('');
  private _filterCategory = signal('')

  initUi() {}

  get categories() {
    return this._categories;
  }

  get products() {
    return computed(() => {
      let items = this._products() || [];
      if (this._filter() != '')
        items = items.filter((product) => product.title.includes(this._filter())) || [];
      if (this._filterCategory() != 'all')
        items = items.filter((product) => product.category.includes(this._filterCategory())) || [];
      return items;
    })
  }

  set filter(f: string) {
    this._filter.set(f);
  }

  set filterCategory(category: string) {
    this._filterCategory.set(category);
  }
}
