import { Component, inject, input } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { JsonPipe } from '@angular/common';
import { IProduct } from '../../core/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog'
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';

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

  addToCart(id: number, title: string) {
    const dialog = this.dialogService.open(
      AddToCartComponent,
      {
        data: { title },
        maxWidth: '30ch'
      }
    );
    dialog.afterClosed().subscribe((res) => {
      console.log(id, res);
    })
  }
}
