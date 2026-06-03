import { Usuario } from "../components/usuarios/model/usuario";
import { Proyecto } from "./proyecto";

export interface MiembroProyecto{
    id?:string
    usuario:Usuario,
    proyecto:Proyecto,
    rol:string,
    fechaUnion: Date
}