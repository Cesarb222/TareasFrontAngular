import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { chatService } from '../../services/chat';
import { ChatMessage } from '../../models/chatMessage';
import { Usuario } from '../usuarios/model/usuario';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgClass, AsyncPipe, DatePipe } from '@angular/common' 
import { Observable, Subscription } from 'rxjs';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { firstValueFrom } from 'rxjs';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { EditorModule } from 'primeng/editor';
import { email } from '@angular/forms/signals';
import { Auth } from '../../auth/services/auth';
@Component({
  selector: 'app-chat',
  imports: [FormsModule, NgForOf,NgClass,DatePipe,EditorModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  messageInput: string = ""
  userID: string = ""
  messageList: any[] = [] 
  user:Usuario | null = null
  proyecto:Proyecto | null = null
  private msgSubscription: Subscription | null = null
  constructor(private chatSe: chatService, private route: ActivatedRoute,
    private usuarioService:UsuarioService,
    private cdr:ChangeDetectorRef,
    private proyectoService:ProyectoService,
    private auth:Auth
  ) {}

  @Input('chat') idproyecto:string = "";
  @Input('tipo') tipo: string = "proyecto"
  

  async ngOnInit() {
    this.auth.isLoggedIn()
    try {
      this.userID = localStorage.getItem('id')!
      this.user = await firstValueFrom(this.usuarioService.getUsuarioEmail(localStorage.getItem('email')!))
      
      if (this.tipo === 'individual') {
          // para chat individual la sala es la combinación de los dos usuarios
          const roomId = [this.userID, this.idproyecto].sort().join('_')
          this.chatSe.joinRoom(roomId)
      } else {
          // chat de proyecto, lógica que ya tienes
          if (this.idproyecto.split('/.').length > 0) {
              this.idproyecto = this.idproyecto.split('/.')[0]
              this.proyecto = await firstValueFrom(this.proyectoService.getProyecto(this.idproyecto))
              this.messageList = await firstValueFrom(this.chatSe.getMessagesProyect(this.idproyecto))
              const historial = await firstValueFrom(this.chatSe.getMessagesProyect(this.idproyecto))
              console.log(historial)
              this.chatSe.initHistory(historial)
              
          }
          this.chatSe.joinRoom(this.idproyecto)
      }
    
    this.listenerMessage()
    this.hacerScroll()
    } catch (error) {
      console.error(error)
    }
}

  sendMessage() {
    const chatMessage:any = {
    proyecto: { id: this.proyecto!.id },   // solo estos campos ya que evito pasar la foto en texto
    usuario: { id: this.user!.id,nombreUsuario: this.user!.nombreUsuario,email:this.user?.email },      
    contenido: this.messageInput,
    fechahora: new Date()
  }
    this.chatSe.sendMessage(this.idproyecto, chatMessage)
    this.messageInput = ""
    this.hacerScroll()
  }

  listenerMessage() {
    this.msgSubscription = this.chatSe.getMessageSubject().subscribe((messages: any[]) => {
      console.log('Subject actualizado, mensajes:', messages.length) // ← ¿aparece?
      this.messageList = messages.map(item => ({
        ...item,
        message_side: item.usuario.id === this.user?.id ? 'sender' : 'receiver'
      }))
      this.cdr.detectChanges()
    })
  }

  ngOnDestroy() {
    this.msgSubscription?.unsubscribe()
  }

  hacerScroll(){
    const contenedor = document.querySelector(".chat-messages") as HTMLElement | null
    if(contenedor){
      contenedor.scrollTo({top:contenedor.scrollHeight,behavior:"smooth"})
    }
  }
}