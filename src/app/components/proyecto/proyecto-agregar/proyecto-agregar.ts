import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Proyecto } from '../../../models/proyecto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { delay, firstValueFrom } from 'rxjs';
import { Usuario } from '../../usuarios/model/usuario';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Auth } from '../../../auth/services/auth';
import { MiembroProyecto } from '../../../models/miembroProyecto';
@Component({
  selector: 'app-proyecto-agregar',
  imports: [],
  templateUrl: './proyecto-agregar.html',
  styleUrl: './proyecto-agregar.css',
})
export class ProyectoAgregar {

  proyecto:Proyecto | null = null
  usuario:Usuario | null = null
  tieneProyecto:boolean = false
  segundos: number = 5
  popup:boolean = false
  private route = inject(ActivatedRoute)
  constructor(
    private proyectoService:ProyectoService,
    private cdr:ChangeDetectorRef,
    private auth:Auth,
    private usuarioService:UsuarioService,
    private router:Router,
  ){

  }
  async ngOnInit(){
    this.auth.isLoggedIn()
    if(this.route.snapshot.paramMap.get('id')){
      const idproyecto = this.route.snapshot.paramMap.get('id');
      this.usuario = await firstValueFrom(this.usuarioService.getUsuarioEmail(this.auth.getEmail()));
      this.proyecto = await firstValueFrom(this.proyectoService.getProyecto(idproyecto!))
      const proyectos:Proyecto[] = await firstValueFrom(this.proyectoService.getProyectosUsuario(this.usuario.email))
      this.tieneProyecto = proyectos.find(item=> item.id == this.proyecto?.id)?.id == this.proyecto.id
      this.cdr.detectChanges()
    }
  }

  async unirseProyecto(){
    const mp:MiembroProyecto = {
      usuario:this.usuario!,
      proyecto:this.proyecto!,
      rol:"USUARIO",
      fechaUnion:new Date()
    } 
    const objectMp= await firstValueFrom(this.proyectoService.addUsuarioProyecto(mp))
    if(objectMp!=null) await this.tiempo()
  }

  async cancelarUnion(){
    await this.tiempo()
  }

  async tiempo(){
    this.popup = true
      this.cdr.detectChanges()
      for (let i = 0 ; i<5; i++) {
        await new Promise(resolve=> setTimeout(resolve,1000))
        this.segundos--
        this.cdr.detectChanges()
      }
      if(this.segundos == 0){
        this.segundos = 5
        this.router.navigate(['dashboard'])
      }
  }
}
