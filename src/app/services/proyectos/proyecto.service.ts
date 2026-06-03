import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { Usuario } from '../../components/usuarios/model/usuario';
import { Observable } from 'rxjs';
import { MiembroProyecto } from '../../models/miembroProyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  
  constructor(
    private http:HttpClient
  ) {
    
  }

  private baseUrl = 'https://tareasback.up.railway.app/'
  getUsuariosProyect(proyecto:Proyecto):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/mp/userproyect/${proyecto.id}`)
  }

  getProyectosUsuario(email:string):Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.baseUrl}/mp/proyectuser/${email}`)
  }

  insertUpdateProyecto(proyecto:Proyecto):Observable<Proyecto>{
    if(!proyecto.id) return this.http.post<Proyecto>(`${this.baseUrl}/proyecto/add`,proyecto)
    else return this.http.put<Proyecto>(`${this.baseUrl}/proyecto/update`,proyecto)
  }

  getProyecto(idProyecto:string):Observable<Proyecto>{
    return this.http.get(`${this.baseUrl}/proyecto/${idProyecto}`)
  }

  addUsuarioProyecto(mp:MiembroProyecto):Observable<MiembroProyecto>{
    return this.http.post<MiembroProyecto>(`${this.baseUrl}/mp/agregar`,mp)
  }
}
