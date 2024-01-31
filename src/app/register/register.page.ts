import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  isAlertOpen = false;
  alertButtons = ['Acept'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  customerData = {
    name: '',
    surname: '',
    code: '',
    email: '',
    phone: '',
    password: ''
  };

  constructor(private customerService: CustomerService, private router: Router) { }

  registerCustomer() {
    this.customerService.registerCustomer(this.customerData).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/login'); // redirige a la página de inicio de sesión
      },
      (error) => {
        console.error('Error:', error);
        this.isAlertOpen = true;
      }
    );
  }
}
