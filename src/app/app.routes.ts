import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'menu', 
    component: FoodListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'cart', 
    component: CartComponent,
    canActivate: [AuthGuard]
  }
];
