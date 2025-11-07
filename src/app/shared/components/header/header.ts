import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../pages/auth/servicies/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  isLogged = false;
  data: any = {};
  private destroy$ = new Subject<any>();
  constructor(private router: Router, 
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.isLogged$
      .pipe(takeUntil(this.destroy$))
      .subscribe( (isLogged) => {
        this.isLogged = isLogged;
        this.obtenerInformacion();
      });
  }

  obtenerInformacion() {
    this.authSvc.tokenData$
      .pipe(takeUntil(this.destroy$))
      .subscribe( (data) => {
        console.log(data);
        this.data = data;
      });
  }

  onNavigate() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authSvc.logout();
  }

}
