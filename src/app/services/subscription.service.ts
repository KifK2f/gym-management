import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun jeton d\'authentification trouvé.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Ajoutez "Bearer" devant le jeton
      'Content-Type': 'application/json'
    });
  }

  getAllSubscriptions(): Observable<any> {
    return this.http.get(API_URL, { headers: this.getHeaders() });
  }

  getSubscriptionById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, { headers: this.getHeaders() });
  }

  addSubscription(data: any): Observable<any> {
    return this.http.post(API_URL, data, { headers: this.getHeaders() });
  }

  updateSubscription(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteSubscription(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, { headers: this.getHeaders() });
  }
}