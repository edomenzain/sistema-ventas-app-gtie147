import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing-module';
import { Usuarios } from './usuarios';
import { MaterialModule } from '../../material.module';
import { UsuarioDialog } from './components/usuario-dialog/usuario-dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Usuarios,
    UsuarioDialog
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsuariosModule { }
