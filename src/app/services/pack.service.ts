import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/packs';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  constructor(private http: HttpClient) {}

   // ✅ Fonction pour obtenir les headers avec le token
   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllPacks(): Observable<any> {
    return this.http.get(API_URL, { headers: this.getHeaders() });
  }

  getPackById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, { headers: this.getHeaders() });
  }

  addPack(data: any): Observable<any> {
    return this.http.post(API_URL, data, { headers: this.getHeaders() });
  }

  updatePack(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data, { headers: this.getHeaders() });
  }

  deletePack(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
