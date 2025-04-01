import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-customer-edit',
  imports: [RouterModule,FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  customer: any = {};

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerById(Number(id)).subscribe(data => {
      this.customer = data;
    });
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer.id, this.customer).subscribe(() => {
      alert('Client modifié avec succès !');
      this.router.navigate(['/customers']);
    });
  }
}
