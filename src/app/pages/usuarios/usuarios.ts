import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialog } from './components/usuario-dialog/usuario-dialog';
import { UsuarioService } from './services/usuario.service';
import { User } from '../../shared/models/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {

  constructor(private dialog: MatDialog,
              private usuarioSvc: UsuarioService,
              private cdr: ChangeDetectorRef) {}

  usuarios: User[] = []

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioSvc.listarUsuarios().subscribe( (usuarios) => {
      this.usuarios = usuarios;
      this.cdr.detectChanges();
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
      if (result) {
        this.listar();
        Swal.fire({
          title: '',
          text: 'Los datos se guardaron correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  eliminarUsuario(id: number) {
    Swal.fire({
      title: "",
      text: "¿Realmente quieres eliminar el registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Llamar la API para eliminar el registro
      }
    });
  }

}

//! ng g s pages/usuarios/services/usuario.service

//! AGREGAR INTERCEPTOR
//! ng g interceptor shared/interceptors/token