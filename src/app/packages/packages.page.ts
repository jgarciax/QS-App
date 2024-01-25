import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage {
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
