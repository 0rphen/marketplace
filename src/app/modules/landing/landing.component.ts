import { Component, OnInit, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductsComponent } from '../products/products.component';
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';
import { ICartItem } from '../../core/interfaces/cart-item.interface';
import { CartFacade } from '../../core/facade/cart.facade';
import { CartComponent } from '../cart/cart.component';
import { NgClass } from '@angular/common';
import { ProductFacade } from '../../core/facade/product.facade';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ProductsComponent,
    AddToCartComponent,
    CartComponent,
    NgClass
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  productFacade = inject(ProductFacade);
  cartFacade = inject(CartFacade);
  openCart = signal(false);

  categories = this.productFacade.categories;
  products = this.productFacade.products;
  items = this.cartFacade.size;

  ngOnInit(): void {
    this.productFacade.initUi();
  }

  setFilter(filter:string) {
    this.productFacade.filter = filter;
  }

  addToCart(product: ICartItem) {
    this.cartFacade.setCartItem(product);
  }

  toggleCart() {
    this.openCart.update((cart) => !cart);
  }

  selected(category: string) {
    this.productFacade.filterCategory = category;
  }
}
