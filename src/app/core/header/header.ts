import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../auth/services/auth';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {


  menuOpen = false;

  constructor(public authService:Auth){

  }



  menu() {
    this.menuOpen = !this.menuOpen;
  }



}
