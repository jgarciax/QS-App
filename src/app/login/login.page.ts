import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  isAlertOpen = false;
  alertButtons = ['Action'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }


  customerData = {
    email: '',
    password: ''
  };
  
  constructor(private customerService: CustomerService, private router: Router) { }

  loginCustomer() {
    this.customerService.loginCustomer(this.customerData).subscribe(
      (data: any) => {
        console.log(data); // Se Imprimen los datos para verificar su estructura
          
        if (data && data.token) { 
          this.customerService.setToken(data.token); // Guarda el token en el almacenamiento local
          this.router.navigateByUrl('/tab1');
          console.log('Token obtenido')
        } else {
          this.isAlertOpen = true;
          console.error('Error: No se recibió el token');

        }
      },
      (error) => {
        
        console.error('Error:', error);
        
      }
    );
  }
}
