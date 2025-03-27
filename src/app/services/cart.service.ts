import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodItem } from './food.service';

export interface CartItem extends FoodItem {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  addToCart(food: FoodItem) {
    const existingItem = this.cartItems.find(item => item.id === food.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...food, quantity: 1 });
    }
    this.updateCart();
  }

  removeFromCart(foodId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== foodId);
    this.updateCart();
  }

  updateQuantity(foodId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === foodId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(foodId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems]);
    this.totalSubject.next(
      this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    );
  }
}
