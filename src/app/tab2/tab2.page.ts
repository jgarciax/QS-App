import { Component } from '@angular/core';
import { CustomerService } from '../customer.service'; // Asegúrate de importar tu servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  alertButtons = ['Action'];
  updateData: any = {
    name: '',
    surname: '',
    code: '',
    email: '',
    phone: ''
  };

  constructor(private customerService: CustomerService, private router: Router) { }

  updateProfile() {
    this.customerService.updateProfile(this.updateData).subscribe(
      
      (data) => {
        console.log('Profile Update!:', data);
        this.router.navigateByUrl('/tab1');
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
