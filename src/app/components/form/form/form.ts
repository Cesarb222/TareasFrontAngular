import { Component, Inject, Input } from '@angular/core';
import { FormBuild } from '../../../models/formularios';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class formComponent {

  @Input('formulario') formulario:FormBuild | null = null

  ngOnInit(){
    console.log(this.formulario)
  }
}
