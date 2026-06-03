import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { TareasModel } from '../../models/tarea';
import { Observable } from 'rxjs';
import { Proyecto } from '../../models/proyecto';
import { Tarea } from '../../components/tareas/tarea/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(
    private http:HttpClient
  ) {
    
  }
  private baseUrl = "https://tareasback.up.railway.app/tareas"

  getMistareas(email:string): Observable<TareasModel[]>{
    return this.http.get<TareasModel[]>(`${this.baseUrl}/${email}`)
  }
  getTarea(idTarea:string):Observable<TareasModel>{
    return this.http.get<TareasModel>(`${this.baseUrl}/tarea/${idTarea}`)
  }
  getTareaByProyect(proyecto:Proyecto):Observable<TareasModel[]>{
    return this.http.get<TareasModel[]>(`${this.baseUrl}/proyecto/${proyecto.id}`)
  }
  updateTarea(tarea:TareasModel): Observable<any>{
    return this.http.put(`${this.baseUrl}/tarea`,tarea,{responseType: 'text'})
  }
  
  addTarea(tarea:TareasModel): Observable<TareasModel>{
    return this.http.post<TareasModel>(`${this.baseUrl}/add`,tarea)
  }
  

  returnProgreso(tareas:TareasModel[]){
    let progreso = {tTotales:tareas.length,tCompletadas:0,tCurso:0,tPendientes:0} 
    tareas.forEach(item=>{
      if(item.estado == "CERRADO") progreso['tCompletadas'] = progreso['tCompletadas']+1
      if(item.estado == "NO REALIZADO") progreso['tPendientes'] = progreso['tPendientes']+1
      if(item.estado == "ACTIVO") progreso['tCurso'] = progreso['tCurso']+1
    })
    return progreso
  }
}
