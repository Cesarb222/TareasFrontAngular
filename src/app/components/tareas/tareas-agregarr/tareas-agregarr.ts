import { ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../../../services/tareas/tarea.service';
import { TareasModel } from '../../../models/tarea';
import { FormBuild, HttpMethodFB, TipoInput } from '../../../models/formularios';
import { formComponent } from '../../form/form/form';
import { form } from '@angular/forms/signals';
import { Proyecto } from '../../../models/proyecto';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../../usuarios/model/usuario';
import { Auth } from '../../../auth/services/auth';
@Component({
  selector: 'app-tareas-agregarr',
  imports: [EditorModule,FormsModule],
  templateUrl: './tareas-agregarr.html',
  styleUrl: './tareas-agregarr.css',
})
export class TareasAgregarr {
  text: string | undefined;
  listSelectPrioridad = [{key:"ALTA",value:"3-ALTA"},
                          {key:"URGENTE",value:"4-URGENTE"},
                          {key:"BAJA",value:"1-BAJA"},
                          {key:"MEDIA",value:"2-MEDIA"}
                        ].sort((a,b)=>a.value.localeCompare(b.value))

  listSelectEstado=[{key:"NO REALIZADO",value:"NO REALIZADO"},
                          {key:"ACTIVA",value:"ACTIVA"},
                          {key:"CERRADO",value:"CERRADO"}
                        ]
  listUser:any[] = []
  constructor(
    private tareaService:TareaService,
    private cdr:ChangeDetectorRef,
    private proyectoService:ProyectoService,
    private usuarioService:UsuarioService,
    private router:Router,
    private auth:Auth
  ){

  }
  private route = inject(ActivatedRoute)
  tareaParam:TareasModel | null=null
  formBuilder:FormBuild | null = null
  html = ''
  nUser = ""
  proyecto:Proyecto | null = null
  usuario: Usuario | null = null
  ngOnInit(){
    this.auth.isLoggedIn()
    this.route.paramMap.subscribe(async (params)=>{
      this.nUser = localStorage.getItem("nameUser") ?? ''
      let id = params.get('id')
      if(id != null) {}
        this.usuario = await firstValueFrom(this.usuarioService.getUsuarioEmail(this.auth.getEmail()))
        this.proyecto = await firstValueFrom(this.proyectoService.getProyecto(id!));
        this.listUser = await firstValueFrom(this.proyectoService.getUsuariosProyect(this.proyecto))
        this.listUser = this.listUser.map(item=>({key:item.email,value:item.nombreUsuario}))
        this.cdr.detectChanges()    
})}
              
        
      

  
  addTask = (event:SubmitEvent):void=>{
    const confirmado = confirm('¿Estás seguro de que quieres guardar los cambios?')
    if(!confirmado) return
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    let formObj = Object.fromEntries(formData.entries())
    formObj['descripcion'] = this.text ?? '';
    this.usuarioService.getUsuarioName(formObj['asignadoA'].toString()).subscribe({
      next: (res)=> {
        let tarea:TareasModel = {
          proyecto:this.proyecto!,
          titulo: formObj['titulo'] as string,
          descripcion:this.text ?? '',
          estado: formObj['estado'] as string,
          prioridad: formObj['prioridad'] as string,
          creadoPor: this.usuario!,
          asignadoA:res,
          fechaCreacion:new Date(),
          fechaLimite: new Date(formObj['fechaLimite'] as string)
    }
        this.tareaService.addTarea(tarea).subscribe({
          next: (res)=> {
            window.history.back()
            this.router.navigate(["dashboard"])
          },
          error: (err) => console.error('Error alñ actualizar',err)
        })
      },
      error(err) {
          console.error(err)
      },
    })
    
  }
  discardTask(){
    const confirmado = confirm('Aviso: ¿Estás seguro de que quieres salir sin guardar los cambios? \nlos cambios que tengas se perderan.')
    if(!confirmado) return
    else{
      this.router.navigate(["dashboard"])
    }
  }

  
}
