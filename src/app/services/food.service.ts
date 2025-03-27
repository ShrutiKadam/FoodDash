import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foods: FoodItem[] = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce and mozzarella',
      price: 12.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      description: 'Juicy chicken patty with fresh vegetables',
      price: 8.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 7.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      name: 'Pasta Carbonara',
      description: 'Creamy pasta with bacon and parmesan',
      price: 11.99,
      image: 'https://via.placeholder.com/150'
    }
  ];

  getFoods(): Observable<FoodItem[]> {
    return of(this.foods);
  }
}
