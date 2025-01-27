import { Component, computed, inject } from '@angular/core';
import { CartFacade } from '../../core/facade/cart.facade';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartFacade = inject(CartFacade);
  products = this.cartFacade.products;

  total = computed(() =>
    this.products().reduce((acc, cur) => {
      return acc + (cur.price * cur.amount!)
    }, 0))

  deleteItem(id: number) {
    this.cartFacade.removeCartItem(id);
  }

  download() {
    const csv = this.cartFacade.dowloadCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'file.csv';
    link.click();
  }
}
