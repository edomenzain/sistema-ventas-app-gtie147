import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../shared/utils/base-form';
import { User } from '../../../../shared/models/user.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-dialog',
  standalone: false,
  templateUrl: './usuario-dialog.html',
  styleUrl: './usuario-dialog.scss'
})
export class UsuarioDialog implements OnInit {

  userForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', [Validators.required]]
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UsuarioDialog>,
              private fb: FormBuilder,
              public baseForm: BaseForm,
              private userSvc: UsuarioService) { }

  ngOnInit(): void {
    this.pathData();
  }

  private pathData() {
    if (this.data.usuario.id) {
      this.userForm.patchValue({
        id: this.data.usuario.id,
        name: this.data.usuario.name,
        lastname: this.data.usuario.lastname,
        username: this.data.usuario.username,
        role: this.data.usuario.role,
      })
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    var data = this.userForm.getRawValue();
    var user: User = {
      name: data.name!,
      lastname: data.lastname!,
      username: data.username!,
      role: data.role!,
      password: 'admin123'
    }

    // Actualizar la informacion
    if (this.data.usuario.id) {
      user.id = this.data.usuario.id;
      // TODO: Realizar la actualizacion de los datos
    }  else {
      // Realizar la inserción de los datos
      this.userSvc.insertarUsuario(user).subscribe( (user) => {
        this.dialogRef.close(user);
      });
    }
  }

}
