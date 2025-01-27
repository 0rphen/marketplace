import { Component, inject, input, output } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';
import { ICartItem } from '../../core/interfaces/cart-item.interface';
import { IProduct } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ItemComponent, JsonPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  dialogService = inject(MatDialog)

  products = input<IProduct[] | undefined>([]);
  items = input<any[]>([]);
  setProduct = output<ICartItem>();

  addToCart(id: number, title: string) {
    const amount = this.items().find((cart) => cart.id === id)?.amount || 0;
    console.log(amount, this.items());
    const dialog = this.dialogService.open(
      AddToCartComponent,
      {
        data: { title, amount },
        maxWidth: '30ch'
      }
    );
    dialog.afterClosed().subscribe((amount: number) => {
      if (amount == 0) return;
      this.setProduct.emit({ id, amount });
    })
  }
}
