import { Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { LandingComponent } from './modules/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'checkout',
    component: CartComponent,
  },
];
