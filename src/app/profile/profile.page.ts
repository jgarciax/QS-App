import { Component } from '@angular/core';
import { CustomerService } from '../customer.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  customerData: any;

  constructor(private customerService: CustomerService) {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.customerService.getCustomerInfo().subscribe(
      (data) => {
        this.customerData = data;
        console.log('Datos obtenidos!')
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
