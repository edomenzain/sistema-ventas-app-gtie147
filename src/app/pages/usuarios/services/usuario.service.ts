import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, 
              private router: Router, 
              private snackbar: MatSnackBar,) {
  }

  listarUsuarios() {
    return this.http.get<User[]>(`${environment.BASE_URL}/user`, 
      { headers: { "requireToken" : "true" }}).pipe(
        catchError( (error) => this.handlerError(error) )
      );
  }

  insertarUsuario(user: User) {
    return this.http.post<User>(`${ environment.BASE_URL}/user`, user,
      { headers : {"requireToken" : "true"}}).pipe(
        catchError( (error) => this.handlerError(error) )
      );
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';
    if (error) {
      errorMessage = `${ error.error.message }`;
    }

    this.snackbar.open(errorMessage, '', {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    throw new Error(errorMessage);
  }
  
}
