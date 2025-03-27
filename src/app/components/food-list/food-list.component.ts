import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FoodService, FoodItem } from '../../services/food.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  foods: FoodItem[] = [];
  cartItemCount = 0;

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });

    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  addToCart(food: FoodItem) {
    this.cartService.addToCart(food);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
