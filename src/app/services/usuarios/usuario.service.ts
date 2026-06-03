import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../components/usuarios/model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  constructor(private http:HttpClient){

  }

  private baseUrl = "https://tareasback.up.railway.app/usuarios"
  getUsuarioEmail(email:string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/${email}`)
  }

  getUsuarioName(name:string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/find/${name}`)
  }

  updateUser(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseUrl}/edit`,usuario)
  }
}
