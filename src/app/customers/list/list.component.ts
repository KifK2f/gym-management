import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    console.log(localStorage.getItem("token"));
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  deleteCustomer(id: number) {
    if (confirm("Voulez-vous supprimer ce client ?")) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }
}
