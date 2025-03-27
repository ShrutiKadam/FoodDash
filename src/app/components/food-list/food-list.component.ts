import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FoodService, FoodItem } from '../../services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class FoodListComponent implements OnInit {
  foodItems: FoodItem[] = [];
  filteredFoodItems: FoodItem[] = [];
  cartItemCount = 0;
  categories: string[] = ['All', 'Indian', 'Pizza', 'Burger', 'Sandwich'];
  selectedCategory: string = 'All';

  constructor(
    private foodService: FoodService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodItems = this.foodService.getFoodItems();
    this.filteredFoodItems = this.foodItems;
    this.foodService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 1), 0);
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredFoodItems = category === 'All' 
      ? this.foodItems
      : this.foodItems.filter(item => item.category === category);
  }

  addToCart(item: FoodItem): void {
    this.foodService.addToCart(item);
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }
}
