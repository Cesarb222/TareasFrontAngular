import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chatMessage';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class chatService {
  private stompClient: any
  private messageSubject = new BehaviorSubject<ChatMessage[]>([])
  private currentSubscription: any = null


  constructor(private http:HttpClient) {
    this.initConectionSocket()
  }


  initConectionSocket() {
    const url = "http://localhost:8080/chat-socket"
    const socket = new SockJS(url)
    this.stompClient = Stomp.over(socket)
  }

  joinRoom(roomId: string) {
    // limpia mensajes anteriores
    // this.messageSubject.next([])

    this.stompClient.connect({}, () => {
      // desuscribe sala anterior si existe
      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe()
      }

      this.currentSubscription = this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body)
        const current = this.messageSubject.getValue()
        this.messageSubject.next([...current, messageContent])
      })
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
  console.log('connected?', this.stompClient.connected);

  if (!this.stompClient.connected) {
    console.error('No conectado al websocket');
    return;
  }

  this.stompClient.send(
    `/app/chat/${roomId}`,
    {},
    JSON.stringify(chatMessage)
  );
}

  getMessageSubject() {
    return this.messageSubject.asObservable()
  }

  getMessagesProyect(idProyecto:string):Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`http://localhost:8080/mensajes/${idProyecto}`)
  }

  initHistory(messages: any[]) {
    this.messageSubject.next(messages)
  }
}


