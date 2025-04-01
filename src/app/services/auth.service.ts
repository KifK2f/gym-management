import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // 🚀 Inscription d'un nouvel utilisateur
  register(user: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, user);
  }

  // 🔑 Connexion et récupération du token JWT
  login(credentials: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${API_URL}/login`, credentials).subscribe(
        (response) => {;
          console.log(response)
          if (response.token) {
            this.saveToken(response.token); 
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  

  

  // 🔐 Vérification si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // 👤 Récupérer les informations de l'utilisateur
  getUserProfile(): Observable<any> {
    return this.http.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  // 🔄 Mettre à jour le compte utilisateur
  updateAccount(user: any): Observable<any> {
    return this.http.put(`${API_URL}/update`, user, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  // 🔑 Changer le mot de passe
  changePassword(data: any): Observable<any> {
    return this.http.post(`${API_URL}/change-password`, data, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  // ❌ Supprimer le compte
  deleteAccount(): Observable<any> {
    return this.http.delete(`${API_URL}/delete`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  // 📌 Stocker le token après connexion
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 🔍 Récupérer le token de l'utilisateur
  getToken(): string | null {
    return localStorage.getItem('token');
  }

   // ✅ Vérifier si l'utilisateur est connecté
   isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // ✅ Retourne `true` si le token existe
  }

  // 🚪 Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
  }
}
