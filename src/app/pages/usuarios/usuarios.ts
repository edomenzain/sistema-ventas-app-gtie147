import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/utils/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialog } from './components/usuario-dialog/usuario-dialog';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {

  constructor(private dialog: MatDialog,
              private usuarioSvc: UsuarioService) {}

  usuarios: Usuario[] = [
    { 
      id: 1, 
      nombre: 'Jose', 
      apellidos: 'Mendez', 
      username: 'JOSE', 
      fechaCreacion: new Date(), 
      estatus: true 
    },
    { 
      id: 2, 
      nombre: 'Maria', 
      apellidos: 'Fernandez', 
      username: 'maria', 
      fechaCreacion: new Date(), 
      estatus: true 
    },
    { 
      id: 4, 
      nombre: 'Pedro', 
      apellidos: 'Gonzalez', 
      username: 'pedro', 
      fechaCreacion: new Date(), 
      estatus: false
    },
  ]

  ngOnInit(): void {
    this.usuarioSvc.listarUsuarios().subscribe( (usuarios) => {
      console.log(usuarios);
    });
  }

  onOpenModal(usuario: any = {}) {
    const dialogRef = this.dialog.open(UsuarioDialog, {
      width: '80%', 
      data: {
        usuario
      }
    });

    dialogRef.afterClosed().subscribe( (result) => {
      console.log(`Se cerro el modal: ${result}`);
    });
  }

}

//! ng g s pages/usuarios/services/usuario.service

//! AGREGAR INTERCEPTOR
//! ng g interceptor shared/interceptors/token