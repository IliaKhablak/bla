import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProdService} from '../services/prod.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgs:string[]=[
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg"
  ]

  constructor(private prod:ProdService) {
  	// document.getElementById('parallax').scrollTo(0,0);

  	
  }

  ngOnInit() {
    this.prod.btntoggle = false;
    this.prod.nav = false;
  }

  ngOnDestroy(){
    this.prod.nav = true;
  }

  bla(val){
    document.getElementById(val).classList.add("changed");
  }

  bla2(val){
    document.getElementById(val).classList.remove("changed");
  }

}
