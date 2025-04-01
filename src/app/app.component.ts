import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gym-management';

  isAuthenticated = false;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
  }


  logout() {
    localStorage.removeItem('token'); 
    this.isAuthenticated = false;
    this.router.navigate(['/login']); 
  }
}
