import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { Proyecto } from '../../models/proyecto';
import { Usuario } from '../../components/usuarios/model/usuario';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  letrasAvatar = localStorage.getItem("nameUser")?.slice(0,1)
  nameUser = localStorage.getItem("nameUser")
  collapsed = true
  proyectosColapsed = true
  popupform = false
  proyectosUsuario:Proyecto[] = [] 
  usuario:Usuario | null = null


  @Output() abrirPopup = new EventEmitter<void>()
  @Output() abrirPopupUsuario = new EventEmitter<void>()
  constructor(
    private router:Router,
    private proyectoService:ProyectoService,
    private usuarioService:UsuarioService
  ) {
    
  }
  ngOnInit(){

    this.usuarioService.getUsuarioEmail(localStorage.getItem("email")!).subscribe({
      next:(user)=> {
        this.usuario = user
        console.log(this.usuario)
      }
    })
    if(localStorage.getItem("sidebar") == "true") this.collapsed = true
    else this.collapsed = false

    this.proyectoService.getProyectosUsuario(localStorage.getItem("email")??'').subscribe({
      next: (value) =>{
        this.proyectosUsuario = value
      },
      error: (err)=>{
        console.error(err)
      }
    })

  }

  updateSidebar(){
    this.collapsed = !this.collapsed
    let estado = this.collapsed ? "true" : "false"

    localStorage.setItem("sidebar",estado)
  }

  navegar(route:string):void{
    this.router.navigate(['/tareas'])
  }

  mostrarProyectos(){
    this.proyectosColapsed = !this.proyectosColapsed
    
  }

  crearProyectos(){
    this.abrirPopup.emit()
  }

  abrirUserPopUp(){
    this.abrirPopupUsuario.emit()
  }

}
