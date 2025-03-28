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
    // Subscribe to get initial total and any updates
    this.cartService.total$.subscribe(total => {
      this.total = total + 40; // Adding delivery fee
    });
  }

  onSubmit() {
    // Show confirmation dialog
    const dialog = window.confirm('Payment successful! Thank you for your order.');
    
    // Clear cart and redirect only after user clicks OK
    if (dialog) {
      this.cartService.clearCart();
      this.router.navigate(['/menu']);
    }
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}
