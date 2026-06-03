import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TareasModel } from '../../../models/tarea';
import {AgGridAngular} from 'ag-grid-angular'
import type { ColDef, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';
import { Route, Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Usuario } from '../../usuarios/model/usuario';
import { Auth } from '../../../auth/services/auth';

const myTheme = themeQuartz
    .withParams({
        accentColor:'#C58702',
        columnBorder:'#C58702',
        backgroundColor: '#212120',
        foregroundColor: '#00000',
        textColor:'#ffff',
        headerBackgroundColor: '#C58702',
        spacing: 12,
        fontSize: 14,
        headerFontSize: 16,
        fontWeight:'normal',
        rowBorder:true,
        borderColor:'#6b6b68',
        borderWidth:1,
        headerFontWeight:'bold',
        cardShadow:'#6b6b68'
    });

@Component({
  selector: 'app-table-task',
  standalone:true,
  imports: [AgGridAngular,NgStyle],
  templateUrl: './table-task.html',
  styleUrl: './table-task.css',
})
export class TableTask {

  constructor(
    private route:Router,
    private auth:Auth
  ){

  }
  autoSizeStrategy:SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth' 
  };
  //Se utiliza input y output para pasar los datos
  @Input() tareaslist: TareasModel[] = []
  @Input() pagination: boolean = true
  @Input() estilos = {}
  theme = myTheme
  rowData: TareasModel[] = [];
  colDefsList: ColDef[] = [
    { field: "id", headerName: "ID", hide:true},
    { field: "titulo", headerName: "Título" },
    { field: "estado", headerName: "Estado",filter:true,valueFormatter: (p)=>{
      return `${p.value.toUpperCase()}`
    }},
    { field: "prioridad", headerName: "Prioridad",valueFormatter: (p)=>{
      return p.value.toUpperCase()
    } },
    { field: "asignadoA.nombreUsuario", headerName: "Asignado a",cellRenderer: (p: any) => {
      console.log(p.data.asignadoA)
        let usuarioAsignado:Usuario = p.data.asignadoA
        console.log(usuarioAsignado)
        let foto = ""
        if (usuarioAsignado.foto != null) {
    foto = `<img src="${usuarioAsignado.foto}" style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    " alt="">`
} else {
    foto = `<span style="
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 1.1rem;
        background-color: #c58702;
        width: 32px;
        height: 32px;
        flex-shrink: 0;
    ">${usuarioAsignado.nombreUsuario[0].toUpperCase()}</span>`
}

return `<div style="display: flex; align-items: center; gap: 8px; height: 100%;">
    ${foto} <span>${usuarioAsignado.nombreUsuario}</span>
</div>`;
    }},
    { field: "fechaCreacion", headerName: "Fecha Creación",hide:true },
    { field: "fechaLimite", headerName: "Fecha Límite",
      valueFormatter: (params) => {
            if (!params.value) return '';
            return new Date(params.value).toLocaleString('es-ES');
        }  },

    { field: "proyecto.nombre", headerName: "Proyecto" },  
    { field: "creadoPor.email", headerName: "Creado por",hide:true },         
];

  ngOnChanges() {
    this.auth.isLoggedIn()
    // Se ejecuta cuando llegan los datos del padre
    if (this.tareaslist.length > 0) {
      this.rowData = this.tareaslist;
    }

  }

  clickrow(event:any){
    this.route.navigate(['/tareas/tarea',event.data.id])
  }
  
}
