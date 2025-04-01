import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-customer-add',
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  customer: any = {
    firstName: '',
    lastName: '',
    registrationDate: '',
    phoneNumber: '',
    activeSubscription: true
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  saveCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(() => {
      alert('Client ajouté avec succès !');
      this.router.navigate(['/customers']);
    });
  }
}
