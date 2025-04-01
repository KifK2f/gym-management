import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/api/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private activeClients$ = new BehaviorSubject<number | null>(null);
  private monthlyRevenue$ = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  // ✅ Fonction pour récupérer les statistiques des clients actifs
  getActiveClients(): Observable<number | null> {
    return this.activeClients$.asObservable();
  }

  // ✅ Fonction pour récupérer le revenu mensuel
  getMonthlyRevenue(): Observable<number | null> {
    return this.monthlyRevenue$.asObservable();
  }

  // ✅ Charger les statistiques et mettre à jour les Observables
  fetchStatistics() {
    this.http.get<any>(`${API_URL}/clients-actifs`, { headers: this.getHeaders() })
      .pipe(tap(data => this.activeClients$.next(data.count)))
      .subscribe();

    this.http.get<any>(`${API_URL}/monthly-revenue`, { headers: this.getHeaders() })
      .pipe(tap(data => this.monthlyRevenue$.next(data.revenue)))
      .subscribe();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
