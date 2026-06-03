import { Usuario } from "../components/usuarios/model/usuario"

export interface Proyecto {
    id?: string
    nombre?: string
    descripcion?: string
    propietario?: Usuario
    fechaCreacion?: Date
    foto?: string | null
}