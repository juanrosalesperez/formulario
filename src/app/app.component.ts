import { Component } from '@angular/core';
import { User } from './model/user';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  obs: Observable<any>;

  // CREAMOS UNA LISTA DE USUARIOS
  usersList: User[] = [];

  // AÑADIMOS UN NUEVO USUARIO
  user: User;

  constructor() {
    for (let i = 0; i < localStorage.length; i++) {
      this.usersList.push(
        JSON.parse(localStorage.getItem(localStorage.key(i)))
      );
    }
  }

  // GUARDAMOS LOS USUARIOS
  guardar(user: User) {
    if (user) {
      // SI NO EXISTE EL EMAIL ---> AÑADIMOS USUARIO
      if (!this.existeUser(this.usersList, user.email)) {
        if (localStorage.getItem(user.email) === null) {
          localStorage.setItem(user.email, JSON.stringify(user));
        }
        window.location.reload();

        // SI EXISTE ---> LANZAMOS UN MENSAJE DE ERROR
      } else {
        Swal.fire({
          title: 'Error en registro!',
          text: 'Email registrado',
          icon: 'warning',
          confirmButtonText: 'Cerrar',
        });
        const posIdx = this.usersList.findIndex(
          (x) => x.email.toLowerCase() === user.email.toLowerCase()
        );
        this.usersList[posIdx] = user;
        window.location.reload();
      }
    }
  }

  existeUser(listaUsuarios: User[], email: string): boolean {
    return (
      this.usersList.findIndex(
        (x) => x.email.toLowerCase() === email.toLowerCase()
      ) >= 0
    );
  }
}
