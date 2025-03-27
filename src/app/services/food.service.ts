import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Creamy, tomato-based curry with tender chicken pieces',
      price: 320,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format',
      category: 'Indian'
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      description: 'Grilled cottage cheese with spices and vegetables',
      price: 280,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format',
      category: 'Indian'
    },
    {
      id: 3,
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato mixture',
      price: 180,
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&auto=format',
      category: 'Indian'
    },
    {
      id: 4,
      name: 'Biryani',
      description: 'Fragrant rice dish with aromatic spices and tender meat',
      price: 350,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format',
      category: 'Indian'
    },
    {
      id: 5,
      name: 'Chole Bhature',
      description: 'Spiced chickpea curry with fluffy fried bread',
      price: 220,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format',
      category: 'Indian'
    },
    {
      id: 6,
      name: 'Veg Thali',
      description: 'Complete meal with rice, dal, vegetables, and bread',
      price: 250,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format',
      category: 'Indian'
    },
    {
      id: 7,
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
      price: 299,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format',
      category: 'Pizza'
    },
    {
      id: 8,
      name: 'Pepperoni Pizza',
      description: 'Classic pizza with spicy pepperoni and melted cheese',
      price: 349,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format',
      category: 'Pizza'
    },
    {
      id: 9,
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh lettuce, tomatoes, and cheese',
      price: 199,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
      category: 'Burger'
    },
    {
      id: 10,
      name: 'Chicken Burger',
      description: 'Grilled chicken patty with special sauce and vegetables',
      price: 179,
      image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=500&auto=format',
      category: 'Burger'
    },
    {
      id: 11,
      name: 'Club Sandwich',
      description: 'Triple-decker with chicken, bacon, lettuce, and tomato',
      price: 220,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format',
      category: 'Sandwich'
    },
    {
      id: 12,
      name: 'Grilled Cheese Sandwich',
      description: 'Classic grilled sandwich with melted cheese and butter',
      price: 150,
      image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&auto=format',
      category: 'Sandwich'
    }
  ];

  private cartItems = new BehaviorSubject<FoodItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() { }

  getFoodItems(): FoodItem[] {
    return this.foodItems;
  }

  getCartItems(): FoodItem[] {
    return this.cartItems.getValue();
  }

  addToCart(item: FoodItem) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...item, quantity: 1 }]);
    }
  }

  updateQuantity(item: FoodItem, change: number) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity = Math.max(1, (existingItem.quantity || 1) + change);
      this.cartItems.next([...currentItems]);
    }
  }

  removeFromCart(itemId: number) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(item => item.id !== itemId));
  }

  getCartTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => 
      total + (item.price * (item.quantity || 1)), 0);
  }
}
