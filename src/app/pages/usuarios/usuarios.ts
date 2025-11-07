import { Component } from '@angular/core';
import { Usuario } from '../../shared/utils/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialog } from './components/usuario-dialog/usuario-dialog';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios {

  constructor(private dialog: MatDialog) {}

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
