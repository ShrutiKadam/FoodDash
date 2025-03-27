import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  total = 0;
  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
  }

  onSubmit() {
    // In a real application, you would handle payment processing here
    alert('Payment successful! Thank you for your order.');
    this.cartService.clearCart();
    this.router.navigate(['/food-list']);
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}
