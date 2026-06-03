import { Usuario } from "../components/usuarios/model/usuario"
import { Proyecto } from "./proyecto"

export interface TareasModel{
    id?:string
    proyecto:Proyecto
    titulo:string
    descripcion:string
    estado:string
    prioridad:string
    creadoPor:Usuario
    asignadoA:Usuario
    fechaCreacion:Date
    fechaLimite:Date
}