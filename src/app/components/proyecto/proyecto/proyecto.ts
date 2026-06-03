import { ChangeDetectorRef, Component, inject, Inject, Input } from '@angular/core';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../../../models/proyecto';
import { DatePipe } from '@angular/common';
import { Usuario } from '../../usuarios/model/usuario';
import { email } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { TareaService } from '../../../services/tareas/tarea.service';
import { TareasModel } from '../../../models/tarea';
import { getBase64FomFile } from '../../../shared/utils';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Auth } from '../../../auth/services/auth';
@Component({
  selector: 'app-proyecto',
  imports: [DatePipe,EditorModule,FormsModule],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.css',
})
export class ProyectoComponent {

  constructor(
    private proyectoService:ProyectoService,
    private cdr:ChangeDetectorRef,
    private tareaService:TareaService,
    private usuarioServicio:UsuarioService,
    private router:Router,
    private auth:Auth
  ){

  }
  email: string | null = localStorage.getItem("email");
  proyecto:Proyecto | null = null
  htmlDescripcion = ""
  usuarios:any[] = []
  objetoTareas: {tTotales:number,tCompletadas:number,tCurso:number,tPendientes:number} | null = null
  private route = inject(ActivatedRoute)
  popupform = false

  fotoBase64 = ""
  text = ""
  
  async ngOnInit(){
    this.auth.isLoggedIn()
    const id = this.route.parent?.snapshot.paramMap.get('id')
    try {
        this.proyecto = await firstValueFrom(this.proyectoService.getProyecto(id!))
        this.htmlDescripcion = this.proyecto.descripcion!

        const users = await firstValueFrom(this.proyectoService.getUsuariosProyect(this.proyecto))
        
        if(this.proyecto!=null){
          this.text = this.proyecto.descripcion!
          this.fotoBase64 = this.proyecto.foto!
          this.usuarios = users
            .filter(u => u.email !== this.proyecto?.propietario!.email)
            .map(u => ({ email: u.email, nameUser: u.nombreUsuario, foto: u.foto ?? null }))

            const tareasProyecto = await firstValueFrom(this.tareaService.getTareaByProyect(this.proyecto))
            this.objetoTareas = this.tareaService.returnProgreso(tareasProyecto)
        }

        this.cdr.detectChanges()
    } catch(err) {
        console.error(err)
    }
}

onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files![0]
    getBase64FomFile(file, (base64: string) => {
      this.fotoBase64 = base64
      this.cdr.detectChanges()
  })
  }


  addProyecto(event:Event){
    event.stopPropagation()
    const form = event.target as HTMLFormElement
    
    
    const formData = new FormData(form)
    let formObj = Object.fromEntries(formData.entries())
    formObj['descripcion'] = this.text ?? ''
    this.usuarioServicio.getUsuarioEmail(this.email!).subscribe({
      next:(user) =>{
        let proyectoNuevo:Proyecto = {
          nombre: formObj['nombre'] as string,
          descripcion: formObj['descripcion'] as string, 
          fechaCreacion: new Date(),
          propietario: user,
          foto: this.fotoBase64.length>0 ? this.fotoBase64 : null
        }
        this.proyectoService.insertUpdateProyecto(Object.assign({},this.proyecto,proyectoNuevo)).subscribe({
          next: (value)=>{
            this.popupform = false
            window.location.reload()
          } 
        })
      },
      error:(err) => console.error(err)
    })
    
  }

  compartirProyecto(event:Event){
    navigator.share({
      title: `Compartir proyecto ${this.proyecto?.nombre}`,
      text:"Prueba navigator",
      url: `/proyecto/unirse/${this.proyecto?.id}`,
    }).then(()=> console.log("compartido")).catch((err)=>{console.error(err)})
  }
}
