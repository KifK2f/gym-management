import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';


@Component({
  selector: 'app-subscription-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  subscriptions: any[] = [];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getAllSubscriptions().subscribe(data => {
      this.subscriptions = data;
    });
  }

  deleteSubscription(id: number) {
    if (confirm("Voulez-vous supprimer cet abonnement ?")) {
      this.subscriptionService.deleteSubscription(id).subscribe(() => {
        this.loadSubscriptions();
      });
    }
  }
}
