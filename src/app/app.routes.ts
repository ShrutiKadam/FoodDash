import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'food-list', component: FoodListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent }
];
