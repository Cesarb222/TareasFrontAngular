import { ChangeDetectorRef, Component } from '@angular/core';
import { Sidebar } from "../../core/sidebar/sidebar";
import { TableTask } from "../tables/table-task/table-task";
import { TareaService } from '../../services/tareas/tarea.service';
import { TareasModel } from '../../models/tarea';
import { mismoDia } from '../../shared/utils';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { getBase64FomFile } from '../../shared/utils';
import { Proyecto } from '../../models/proyecto';
import { Usuario } from '../usuarios/model/usuario';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { Router } from '@angular/router';
import { Auth } from '../../auth/services/auth';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, TableTask,EditorModule,FormsModule],
  standalone:true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  

  username = localStorage.getItem("nameUser")

  tareasEmail: number = 0;
  email: string | null = localStorage.getItem("email");
  tareaslist: TareasModel[] = [];
  objecto = {pendientes:0,completadasHoy:0,proximas:0,vencidas:0}
  popupform = false
  popupUsuario = false
  fotoBase64 = ""
  fotoBase64Usuario = ""
  text = ""
  usuario:Usuario | null = null
  constructor(
    private tareaService:TareaService,
    private cdr:ChangeDetectorRef,
    private usuarioServicio:UsuarioService,
    private proyectoServicio:ProyectoService,
    private router:Router,
    private auth:Auth
  ){
    this.email = this.auth.getEmail()
  }
  
  async ngOnInit(){
    this.auth.isLoggedIn()
    this.usuario = await firstValueFrom(this.usuarioServicio.getUsuarioEmail(this.email!))
    this.fotoBase64Usuario = this.usuario?.foto ?? ""
    this.tareaService.getMistareas(this.email!).subscribe({
            next: (tareas) => {
                this.tareasEmail = tareas.length;
                this.tareaslist = tareas.slice(0,3)
                tareas.map(item=>{
                  if(item.estado.toLocaleLowerCase() == 'no realizado') this.objecto['pendientes'] = this.objecto['pendientes']+1
                  if(item.estado.toLocaleUpperCase() == 'CERRADO' && mismoDia(new Date(item.fechaLimite),new Date()) ) this.objecto['completadasHoy'] = this.objecto['completadasHoy']+1
                  if(item.estado.toLocaleLowerCase() == 'no realizado' && new Date(item.fechaLimite) >= new Date()) this.objecto['proximas'] = this.objecto['proximas']+1
                  if(item.estado.toLocaleLowerCase() == 'no realizado' && new Date(item.fechaLimite) < new Date()) this.objecto['vencidas'] = this.objecto['vencidas']+1
                })
                console.log(this.objecto)
                this.cdr.detectChanges()
                
            },
            error: (err) => {
                console.log(err);
            }
        });
  }

  addProyecto(event:Event){
    event.stopPropagation()
    const form = event.target as HTMLFormElement
    
    
    const formData = new FormData(form)
    let formObj = Object.fromEntries(formData.entries())
    formObj['descripcion'] = this.text ?? ''
    this.usuarioServicio.getUsuarioEmail(this.email!).subscribe({
      next:(user) =>{
        let proyecto:Proyecto = {
          nombre: formObj['nombre'] as string,
          descripcion: formObj['descripcion'] as string, 
          fechaCreacion: new Date(),
          propietario: user,
          foto: this.fotoBase64.length>0 ? this.fotoBase64 : null
        }
        this.proyectoServicio.insertUpdateProyecto(proyecto).subscribe({
          next: (value)=> this.router.navigate(['/dashboard'])
        })
      },
      error:(err) => console.error(err)
    })
    
  }

  editUsuario(event:Event){
    event.stopPropagation()
    const form = event.target as HTMLFormElement
    
    
    const formData = new FormData(form)
    let formObj = Object.fromEntries(formData.entries())
    if(this.usuario != null){
      let usuarioNew:Usuario = Object.assign({},formObj,this.usuario) 
      usuarioNew.foto = this.fotoBase64Usuario.length>0 ? this.fotoBase64Usuario : null
      console.log(usuarioNew)
      this.usuarioServicio.updateUser(usuarioNew).subscribe({next:(user)=>{
        this.popupUsuario = false
        this.cdr.detectChanges();
      }})
    }

    //this.router.navigate(['/dashboard'])


  }

  onFileSelected(event: Event,tipo:string) {
    const input = event.target as HTMLInputElement
    const file = input.files![0]
    getBase64FomFile(file, (base64: string) => {
      if(tipo === 'usuario') this.fotoBase64Usuario = base64
      else this.fotoBase64 = base64
      this.cdr.detectChanges()
  })
  }


  
}
