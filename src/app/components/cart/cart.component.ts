import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FoodService, FoodItem } from '../../services/food.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class CartComponent implements OnInit {
  cartItems: FoodItem[] = [];

  constructor(
    private foodService: FoodService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.foodService.getCartItems();
    this.foodService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: FoodItem, change: number): void {
    this.foodService.updateQuantity(item, change);
  }

  removeFromCart(itemId: number): void {
    this.foodService.removeFromCart(itemId);
  }

  getCartTotal(): number {
    return this.foodService.getCartTotal();
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }
}
