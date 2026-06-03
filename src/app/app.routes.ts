import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login';
import { Home } from './components/home/home';
import { authGuard } from './auth/guards/auth-guard';
import { Register } from './auth/components/register/register';
import { Chat } from './components/chat/chat';
import { Dashboard } from './components/dashboard/dashboard';
import { Tareas } from './components/tareas/tareas';

export const routes: Routes = [
    {path:'auth/login',component:Login},
    {path:'auth/register',component:Register},
    { path: '', component:Home },
    {path:"chat/:userId",component: Chat},
    {path:"dashboard",component: Dashboard},
    {path:"tareas/tarea/:id", loadComponent:()=> import("./components/tareas/tarea/tarea").then(m => m.Tarea)},
    {path:"tareas/agregar/:id", loadComponent:()=> import("./components/tareas/tareas-agregarr/tareas-agregarr").then(m => m.TareasAgregarr)},
    {path:"proyecto/:id", loadComponent:()=> import("./components/proyecto/proyecto-home/proyecto-home").then(m => m.ProyectoHome),children:[
        {path:"", loadComponent:()=> import("./components/proyecto/proyecto/proyecto").then(m => m.ProyectoComponent)},
        {path:"chat", loadComponent:()=> import("./components/proyecto/proyecto-chat/proyecto-chat").then(m => m.ProyectoChat)}
    ]},
    {path:"proyecto/unirse/:id",loadComponent:()=> import("./components/proyecto/proyecto-agregar/proyecto-agregar").then(m=>m.ProyectoAgregar)},
    {path:"tareas",component:Tareas},

    
];
