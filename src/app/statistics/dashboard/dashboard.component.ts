import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeClients: number = 1;
  monthlyRevenue: number = 1;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    // Récupérer les clients actifs
    this.http.get<any>('http://localhost:8080/api/statistics/clients-actifs')
      .subscribe(
        data => {
          console.log('Clients actifs:', data);
          this.activeClients = data.count;
        },
        error => {
          console.error('Erreur lors de la récupération des clients actifs:', error);
        }
      );

    // Récupérer le revenu mensuel
    this.http.get<any>('http://localhost:8080/api/statistics/monthly-revenue')
      .subscribe(
        data => {
          console.log('Revenu mensuel:', data);
          this.monthlyRevenue = data.revenue;
        },
        error => {
          console.error('Erreur lors de la récupération du revenu mensuel:', error);
        }
      );
  }
}