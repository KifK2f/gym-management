import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur d\'inscription', error);
        alert('Erreur lors de l\'inscription');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
