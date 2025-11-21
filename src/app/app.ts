import { Component, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './pages/auth/servicies/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  protected readonly title = signal('sistema-ventas-edm-app');
  
  isLogged = false;
  data: any = {};
  menus: any[] = [];
  private destroy$ = new Subject<any>();
  constructor(private authSvc: AuthService) { }

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
        this.data = data;
        this.generarMenu();
      });
  }

  private generarMenu() {
    this.menus = [];
    if (this.data && this.data!.role == 'admin') {
      var menu = {
        nombre: 'Administrador',
        submenu: [
          {
            icon: 'group',
            nombre: 'Usuarios',
            ruta: 'usuarios'
          },
          {
            icon: 'inventory_2',
            nombre: 'Productos',
            ruta: 'home'
          },
          {
            icon: 'category',
            nombre: 'Categorias',
            ruta: 'home'
          }
        ]
      }
      
      this.menus.push(menu);
    } else if (this.data && this.data.role == 'ventas') {
      var menu = {
        nombre: 'Ventas',
        submenu: [
          {
            icon: 'inventory_2',
            nombre: 'Productos',
            ruta: 'home'
          },
          {
            icon: 'reports',
            nombre: 'Reportes',
            ruta: 'home'
          }
        ]
      }
      this.menus.push(menu);
    }
  }
}
