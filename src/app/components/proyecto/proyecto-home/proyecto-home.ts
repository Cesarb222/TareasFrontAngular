import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthRoutingModule } from "../../../auth/auth-routing-module";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { Proyecto } from '../../../models/proyecto';
import { Auth } from '../../../auth/services/auth';
import { Usuario } from '../../usuarios/model/usuario';
import { UsuarioService } from '../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-proyecto-home',
  imports: [AuthRoutingModule,RouterOutlet],
  standalone:true,
  templateUrl: './proyecto-home.html',
  styleUrl: './proyecto-home.css',
})
export class ProyectoHome {

  letrasAvatar = localStorage.getItem("nameUser")?.slice(0,1)
  nameUser = localStorage.getItem("nameUser")
  collapsed = true
  usuario:Usuario | null = null
  constructor(
    private proyectoService:ProyectoService,
    private cdr:ChangeDetectorRef,
     private auth:Auth,
     private usuarioService:UsuarioService
  ){

  }
  private route = inject(ActivatedRoute)
  proyecto:Proyecto | null = null
  ngOnInit(){
    this.auth.isLoggedIn()

    this.usuarioService.getUsuarioEmail(localStorage.getItem("email")!).subscribe({
      next:(user)=> {
        this.usuario = user
      }
    })

    this.route.params.subscribe(params=>{
      if(params['id']){
        this.proyectoService.getProyecto(params['id']).subscribe({
          next: (proyecto)=>{
            this.proyecto = proyecto
            this.cdr.detectChanges()
          } 
        })
      }
    })
  }

  updateSidebar(){
    this.collapsed = !this.collapsed
  }
}
