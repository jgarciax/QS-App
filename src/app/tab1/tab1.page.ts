import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page {
  packageData: any;

  constructor(private customerService: CustomerService) {
    this.getPackageInfo();
  }

  getPackageInfo() {
    this.customerService.getPackages().subscribe(
      (data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.packageData = data;
          console.log('Packages obtained!', data)
        } else {
          this.packageData = [];
          console.log('Sin paquetes')
        }
      },
      (error) => {
        console.log('Error:', error)
      }
    )
  }
}  

