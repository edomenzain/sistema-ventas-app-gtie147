import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../shared/utils/base-form';

@Component({
  selector: 'app-usuario-dialog',
  standalone: false,
  templateUrl: './usuario-dialog.html',
  styleUrl: './usuario-dialog.scss'
})
export class UsuarioDialog implements OnInit {

  userForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]]
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UsuarioDialog>,
              private fb: FormBuilder,
              public baseForm: BaseForm) { }

  ngOnInit(): void {
    this.pathData();
  }

  private pathData() {
    if (this.data.usuario.id) {
      this.userForm.patchValue({
        id: this.data.usuario.id,
        nombre: this.data.usuario.nombre,
        apellidos: this.data.usuario.apellidos,
        username: this.data.usuario.username,
      })
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    console.log(this.userForm.getRawValue());
  }

}
