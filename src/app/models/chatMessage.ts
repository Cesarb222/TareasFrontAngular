import { Usuario } from "../components/usuarios/model/usuario"
import { Proyecto } from "./proyecto"

export interface ChatMessage{
    id?:string
    contenido:string
    usuario:Usuario
    fechahora:Date
    proyecto?:Proyecto
}
