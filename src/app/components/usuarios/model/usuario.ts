export interface Usuario{
    id?:string;
    nombreUsuario:string;
    email:string;
    password:string;
    fechaCreacion?:Date;
    foto?:string | null;

}