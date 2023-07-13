import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Importe seu serviço de autenticação personalizado
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
  this.authService.login(this.username, this.password).subscribe(
    response => {
      // Lógica de tratamento da resposta do backend
      // Exemplo: salvar token no local storage e redirecionar para a página adequada
      localStorage.setItem('jwt', response.access_token);
      this.router.navigate(['/movies']);
      console.log('Login:', this.username, this.password);
    },
    error => {
      console.error(error);
    }
  );
}
}
