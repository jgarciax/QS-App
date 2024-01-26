import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  alertButtons = ['Action'];
  updateData: any = {
    before: "",
    after: ""
  }
  constructor(private customerService: CustomerService, private router: Router) {}

    updatePassword() {
      this.customerService.updatePassword(this.updateData).subscribe(
        (data) => {
          console.log('Password update!', data);
          this.router.navigateByUrl('/tab1')
        },
        (error) => {
          console.log('before Password incorrect!', error)
        }
      )
  }

}
