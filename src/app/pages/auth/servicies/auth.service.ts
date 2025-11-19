import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = new BehaviorSubject<string>("");
  private tokenData = new BehaviorSubject<any>({});
  private isLogged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, 
              private router: Router, 
              private snackbar: MatSnackBar,
              @Inject(PLATFORM_ID) private platformId: any) {
    this.checkToken();
  }

  get token$(): Observable<string> {
    return this.token.asObservable();
  }

  get tokenValue() {
    return this.token.getValue();
  }

  get tokenData$(): Observable<any> {
    return this.tokenData.asObservable();
  }

  get isLogged$(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  // : Observable<any | void> => await async
  login(username: string, password: string) {
    const data = {
      "username" : username,
      "password" : password
    };
    return this.http.post(`${ environment.BASE_URL }/auth`, data)
      .pipe(map( (data: any) => {
        
        if (data.token) {
          // Guarda el token
          this.saveLocalStorage(data.token);
          // Avisa un cambio en la variable token
          this.token.next(data.token);
          // Avisa un cambio en la variable isLogged
          this.isLogged.next(true);
          // Logica para obtener la data
          this.checkToken();

          // Instalar dependencias
          // npm i @auth0/angular-jwt
          this.router.navigate(['/home']);
        }
        
        return data;
      }),
      catchError( (error) => this.handlerError(error) ));
  }

  saveLocalStorage(token: string) {
    sessionStorage.setItem("jwt-edm", token);
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem("jwt-edm");
      if (token) {
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
          this.logout();
        } else {
          this.token.next(token);
          const {iat, exp, ...payload} = helper.decodeToken(token);
          this.tokenData.next(payload);
          this.isLogged.next(true);
        }
      } else {
        this.logout();
      }
    }
  }

  logout() {
    sessionStorage.removeItem("jwt-edm");
    this.isLogged.next(false);
    this.token.next("");
    this.tokenData.next(null);

    this.router.navigate(['/login']);
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
