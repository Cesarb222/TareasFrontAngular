import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos'
@Component({
  selector: 'app-home',
  imports: [],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router:Router){}
  ngOnInit(){
    AOS.init()
    window.addEventListener("load",AOS.refresh)
  }

  navigation(){
    this.router.navigate(["/dashboard"])
  }
}
