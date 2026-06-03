import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthRoutingModule } from "../../../auth/auth-routing-module";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { Proyecto } from '../../../models/proyecto';
import { Auth } from '../../../auth/services/auth';

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

  constructor(
    private proyectoService:ProyectoService,
    private cdr:ChangeDetectorRef,
     private auth:Auth
  ){

  }
  private route = inject(ActivatedRoute)
  proyecto:Proyecto | null = null
  ngOnInit(){
    this.auth.isLoggedIn()
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
