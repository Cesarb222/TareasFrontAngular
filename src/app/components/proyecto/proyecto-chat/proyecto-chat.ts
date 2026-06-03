import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../../chat/chat';
import { Auth } from '../../../auth/services/auth';

@Component({
  selector: 'app-proyecto-chat',
  imports: [Chat],
  templateUrl: './proyecto-chat.html',
  styleUrl: './proyecto-chat.css',
})
export class ProyectoChat {

  constructor(
    private cdr:ChangeDetectorRef,
    private auth:Auth
  ){}
  private route = inject(ActivatedRoute)
  idProyecto: string = ""
  
  ngOnInit(){
    this.auth.isLoggedIn()
    if(this.route.parent?.snapshot.paramMap.get('id')!=null){
      this.idProyecto = this.route.parent?.snapshot.paramMap.get('id')!
      this.cdr.detectChanges()
    }
  }
}
