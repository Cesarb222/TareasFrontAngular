import { MapType } from "@angular/compiler";

export interface FormBuild{
    method:HttpMethodFB;
    url:string;
    fields:FormField[];
    buttonCancelar:boolean;
    submit: (event:SubmitEvent)=> void
}

export enum HttpMethodFB{
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

export enum TipoInput{
    INTEGER = 'number',
    STRING = 'text',
    DATE = 'date',
    DATETIME = 'datetime-local',
    SELECT = 'select',
    TEXTAREA = 'textarea'
}
export interface FormField{
    tipoCampo:TipoInput;
    //el primer string debe conincidir con el idinput
    valueDefault?:any
    //el primer string debe conincidir con el idinput
    listSelect?: Array<{ key: string; value: string }>;
    idInput:string;
    label: string;          
    placeholder?: any;    
    required: boolean;
    readonly?:boolean;
    selected?: any
} 