import { Component } from '@angular/core';
import { CustomerService } from '../customer.service'; // Asegúrate de importar tu servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage {
  customerData: any;
  
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.deleteProfile()
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
  

  constructor(private customerService: CustomerService, private router: Router) {
    this.getCustomerInfo();
    this.deleteProfile
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

  deleteProfile() {
    this.customerService.deleteProfile().subscribe(
      (data) => {
        this.customerData = data;
        console.log('Perfil Eliminado!')
        this.router.navigateByUrl('/login')
      },
      (error) => {
        console.log(error)
      }
      );
  }
}
