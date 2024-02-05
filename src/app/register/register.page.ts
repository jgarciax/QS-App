import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service'; 
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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
  
  emailError = false;
  phoneError = false;

  validateEmail(email: string) {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.emailError = !re.test(email);
  }

  validatePhone(phone: string) {
    const valid = /^\d{8}$/.test(phone);
    this.phoneError = !valid;
  }

  constructor(private customerService: CustomerService, private router: Router) { }

  generateCode() {
    let result = 'C';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  registerCustomer() {
    if (this.emailError || this.phoneError) {
      this.isAlertOpen = true;
      return;
    }

    // Genera un código aleatorio y lo asigna al campo 'code'
    this.customerData.code = this.generateCode();

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
