import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  isAlertOpen = false;
  showPassword = false;
  alertButtons = ['Acept'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    password: new FormControl('', Validators.required)
  });

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
    if (this.customerForm.invalid) {
      this.isAlertOpen = true;
      return;
    }

    // Genera un código aleatorio y lo asigna al campo 'code'
    const customerData = {
      name: this.customerForm.value.name ?? '',
      surname: this.customerForm.value.surname ?? '',
      email: this.customerForm.value.email ?? '',
      phone: this.customerForm.value.phone ?? '',
      password: this.customerForm.value.password ?? '',
      code: this.generateCode()
    };
    
    this.customerService.registerCustomer(customerData).subscribe(
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
