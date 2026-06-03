import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { TareaService } from '../../services/tareas/tarea.service';
import { TareasModel } from '../../models/tarea';
import {TableTask} from '../tables/table-task/table-task'
import { Sidebar } from "../../core/sidebar/sidebar";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario } from '../usuarios/model/usuario';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { firstValueFrom } from 'rxjs';
import { Proyecto } from '../../models/proyecto';
import { Auth } from '../../auth/services/auth';
@Component({
  selector: 'app-tareas',
  imports: [TableTask, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas {
    tareasEmail: number = 0;
    email: string = localStorage.getItem("email") ?? "";
    usuario:Usuario | null = null
    tareaslist: TareasModel[] = [];
    mode:string = ""
    proyecto:Proyecto | null = null
    constructor(
        private tareaService: TareaService,
        private cdr:ChangeDetectorRef,
        private route:ActivatedRoute,
        private proyectoServicio:ProyectoService,
        private auth:Auth
    ) {}

    async ngOnInit() {
        this.auth.isLoggedIn()
        this.route.queryParams.subscribe(params=>{
            this.mode = params['mode']
        })
        if(this.mode == 'usuario'){
        this.tareaslist = await firstValueFrom(this.tareaService.getMistareas(this.email))
        this.tareasEmail = this.tareaslist.length
        }else{
            const proyecto = await firstValueFrom(this.proyectoServicio.getProyecto(this.mode))
            this.tareaslist= await firstValueFrom(this.tareaService.getTareaByProyect(proyecto))
            this.tareasEmail = this.tareaslist.length
            this.proyecto = proyecto
        }
        this.cdr.detectChanges()
    }
}
