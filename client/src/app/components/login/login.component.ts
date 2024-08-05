import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  message: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.usuario, this.contrasena).subscribe(
      response => {
        if (response.success) {
          this.message = 'Inicio de sesión exitoso';
          this.loginService.setCurrentUser(response.usuario);
          
          // Verificar el valor de tipo_Usuario
          console.log('Usuario logueado:', response.usuario);

          // Redirigir según el rol del usuario
          if (response.usuario.tipo_Usuario.toLowerCase() === 'admin') {
            this.router.navigate(['/menu']);
          } else {
            this.router.navigate(['/cortedecaja']);
          }
        } else {
          this.message = response.message;
        }
      },
      error => {
        this.message = 'Error al iniciar sesión';
        console.error(error);
      }
    );
  }
}
