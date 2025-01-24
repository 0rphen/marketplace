import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductsComponent } from '../products/products.component';
import { LandingFacade } from './facade/landing.facade';
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ProductsComponent,
    AddToCartComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  landingFacade = inject(LandingFacade);
  categories = this.landingFacade.categories;
  products = this.landingFacade.products;

  ngOnInit(): void {
    this.landingFacade.initUi();
  }

  setFilter(filter:string) {
    this.landingFacade.filter = filter;
  }
}
