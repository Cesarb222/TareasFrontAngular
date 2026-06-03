import { Component,ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  standalone:true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(
    private authService:Auth,
    private router:Router,
    private cdr: ChangeDetectorRef
  ){

  }
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  verPassword = false
  errorMensaje = ""



  ngOnInit(){
    if(this.authService.isLoggedIn()) this.router.navigate(['/dashboard'])
  }

  login(){
    const email = this.form.get('email')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';
    
    this.authService.login(email, password).subscribe({
        next: (token) => {
            this.authService.saveToken(token)
            this.cdr.detectChanges()
            this.router.navigate(['/dashboard'])
        },
        error: (err) => {
            this.errorMensaje = err.error ?? "Error al iniciar sesion"
            this.cdr.detectChanges()
        }
    });
  }
}
