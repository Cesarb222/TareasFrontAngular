import { Component,ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { email } from '@angular/forms/signals';
import { Usuario } from '../../../components/usuarios/model/usuario';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(
    private authService:Auth,
    private router:Router
  ){}

  form = new FormGroup({
    email: new FormControl(''),
    nombreUsuario: new FormControl(''),
    password:new FormControl(''),
    repeatPassword: new FormControl('')
  })

  verPassword = false
  verRPassword = false
  errorMensaje = ''

  ngOnInit(){
    if(this.authService.isLoggedIn()) this.router.navigate([''])
  }

  register(){
    const email = this.form.get('email')?.value
    const nombreUsuario = this.form.get('nombreUsuario')?.value
    const password = this.form.get('password')?.value
    const repeatPassword = this.form.get('repeatPassword')?.value
    if(password != repeatPassword) this.errorMensaje = "Las contraseñas no coinciden"

    let usuario:Usuario = {email:email!,nombreUsuario:nombreUsuario!,password:password!}
    this.authService.register(usuario).subscribe({
      next: (res)=>{
        this.router.navigate(['/auth/login'])
      },
      error: (err) =>{
        this.errorMensaje = "Error al registrar usuario"
      }
    })
  }
}
