import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page {
  alertButtons = ['Action'];
  customerData: any;

  constructor(private customerService: CustomerService) {
    this.customerInfo()
  }

  customerInfo() {
    this.customerService.getCustomerInfo().subscribe(
      (data) => {
        this.customerData = data;
        console.log('Packages obtained!')
      },
      (error) => {
        console.log('Client without packages😮 💨', error)
      }
    )
  }

}
