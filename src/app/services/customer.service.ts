import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // ✅ Fonction pour obtenir les headers avec le token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${API_URL}`, { headers: this.getHeaders() });
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, { headers: this.getHeaders() });
  }

  addCustomer(data: any): Observable<any> {
    return this.http.post(API_URL, data, { headers: this.getHeaders() });
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, { headers: this.getHeaders() });
  }
}
