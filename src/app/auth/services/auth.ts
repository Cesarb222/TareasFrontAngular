import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../../components/usuarios/model/usuario';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private baseUrl = 'https://tareasback.up.railway.app/'
  login(email:string,password:string): Observable<string>{
    return this.http.post<any>(`${this.baseUrl}auth/login`,{email,password})
  }

  saveToken(token:any):void{
    if(token){
      localStorage.setItem("tjwt",token.token)
      localStorage.setItem("email",token.email)
      localStorage.setItem("userId",token.id)
      localStorage.setItem("nameUser",token.username)
      this.router.navigate([''])
    } 
  }

  //comprobamos la expiracion del token
  isLoggedIn(): boolean {
    const token = localStorage.getItem("tjwt")
    console.log(token)
    if(!token) return false

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now()/1000;
  }

  register(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}usuarios/add`,usuario)
  }

  getEmail(): string { return localStorage.getItem('email') ?? '' }
  getUsername(): string { return localStorage.getItem('nameUser') ?? '' }

  logout(){
    if(this.isLoggedIn()){
      localStorage.removeItem("tjwt")
      localStorage.removeItem("email")
      localStorage.removeItem("userId")
      localStorage.removeItem("nameUser")
      return this.router.createUrlTree(['/auth/login'])
    }
  }
}
