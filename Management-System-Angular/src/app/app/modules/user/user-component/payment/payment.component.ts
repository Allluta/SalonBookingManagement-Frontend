import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { PaymentService } from 'src/app/auth/services/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  creditCardNumber: string = '';
  paymentStatusMessage: string = '';
  isNavbarVisible: boolean = true;
  paymentUrl: string = ''; 
  cardHolderName: string = '';
  expiryDate: string = '';
  cvv: string = '';

  banks = [
    { name: 'MBank', logo: 'assets/mbank.jpg' },
    { name: 'Alior Bank', logo: 'assets/alior-bank-logo.jpg' },
    { name: 'Credit Agricole', logo: 'assets/CreditAgricole.jpg' },
    { name: 'Pekao', logo: 'assets/peako.jpg' }
    
  ];

  selectedBank: any;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        
        this.isNavbarVisible = false;
      } else if (event instanceof NavigationEnd) {
        
        this.isNavbarVisible = true;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paymentUrl = params['paymentUrl'];
    });
  }

  processPayment() {
    
    this.paymentService.createPaymentIntent().subscribe(
      response => {
        const clientSecret = response.clientSecret;
  
        
        this.paymentService.processPayment({
          creditCardNumber: this.creditCardNumber,
          clientSecret: clientSecret
        
        }).subscribe(
          paymentResponse => {
            this.paymentStatusMessage = 'Płatność udana!';
            console.log('Płatność udana!', paymentResponse);
  
           
            this.redirectToReservations();
          },
          paymentError => {
            this.paymentStatusMessage = 'Błąd płatności';
            console.error('Błąd płatności', paymentError);
          }
        );
      },
      error => {
        this.paymentStatusMessage = 'Błąd pobierania danych płatności';
        console.error('Błąd pobierania danych płatności', error);
      }
    );
  }

  openPaymentPage(paymentUrl: string) {
    console.log('Navigating to payment-view with paymentUrl:', paymentUrl);
    this.router.navigate(['/payment-view',  paymentUrl ]);
  }
  redirectToReservations() {
    
    this.router.navigate(['/user/yourreservations']);
  }
  formatCreditCardNumber() {
    
    this.creditCardNumber = this.creditCardNumber.replace(/[\s-]/g, '');

   
    this.creditCardNumber = this.creditCardNumber.replace(/(\d{4}(?!$))/g, '$1 ');
  }
formatExpiryDate() {
    
    this.expiryDate = this.expiryDate.replace(/[^\d]/g, '');

    
    if (this.expiryDate.length > 2) {
      this.expiryDate = this.expiryDate.substring(0, 2) + '/' + this.expiryDate.substring(2);
    }
  }

}
