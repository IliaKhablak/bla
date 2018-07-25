import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {ProdService} from '../services/prod.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scrollPos:number = 0;
  Counter:number = 0;
  wow:any;
  wow1:any;
  bla1:any;
  bla3:any;
  wow2 = document.documentElement.clientHeight;
  disapW:any;
  disapP:any;
  disapPTop:any;
  designDiv:any;
  designDivOverlay:any;
  disapS:any;
  securityDiv:any;
  hexOverl:any;
  overlHexTop:any;
  imgs:string[]=[
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg"
  ];

  constructor(private prod:ProdService) {
  	// document.getElementById('parallax').scrollTo(0,0);

  	
  }

  ngOnInit() {
    this.prod.btntoggle = false;
    this.prod.nav = false;
    this.wow = document.getElementById('parallax-try-id');
    this.bla3 = document.getElementById('parallax-try-id3');
    let a = document.getElementById('parallax-try-id2');
    let b = a.offsetTop;
    let c = a.offsetHeight;
    this.wow1 = b+c-this.wow2;
    let q = document.getElementById('parallax-try-id4');
    let w = q.offsetTop;
    let e = q.offsetHeight;
    this.bla1 = w+e-this.wow2;
    this.disapW = document.getElementById('disapW');
    this.disapP = document.getElementById('disapP');
    this.disapS = document.getElementById('disapS');
    this.disapPTop = w+this.wow2+200;
    let r = document.getElementById('designDiv');
    let t = r.offsetTop;
    let y = r.offsetHeight;
    this.designDiv = t+y-this.wow2;
    this.designDivOverlay = document.getElementById('parallax-try-id5');
    let u = document.getElementById('securityDiv');
    let i = u.offsetTop;
    let o = u.offsetHeight;
    this.securityDiv = t+y+this.wow2;
    this.hexOverl = document.getElementById('hexoverl');
    this.overlHexTop = i+o-this.wow2;
    // console.log("POSITION HERE!",this.wow1);

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

  @HostListener ('window:scroll' ,['$event'])
   onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (offset > this.scrollPos) {
          this.Counter +=1
      } else {
          this.Counter -=1
      }
      this.scrollPos = offset;
      // console.log(this.scrollPos)
      if(this.scrollPos>this.wow1){
        let a = 1-(((this.scrollPos - this.wow1)/1000)*2);
        let b = a.toFixed(2);

        // console.log(b);
        this.wow.style = "background: rgba(0, 0, 0,"+b+");";
      }
      if(this.scrollPos>this.bla1){
        let a = 1-(((this.scrollPos - this.bla1)/1000)*2);
        let b = a.toFixed(2);

        // console.log(b);
        this.bla3.style = "background: rgba(0, 0, 0,"+b+");";
      }
      if(this.scrollPos>this.bla1+this.wow2-100){this.bla3.style = "display:none;"}
      if(this.scrollPos>200){
        let a = 1-(((this.scrollPos - 200)/1000)*2);
        let b = a.toFixed(2);
        this.disapW.style = "opacity:"+b+";";
      }else{this.disapW.style = "opacity:1;";}
      if(this.scrollPos>this.disapPTop){
        let a = 1-(((this.scrollPos - this.disapPTop)/1000)*2);
        let b = a.toFixed(2);
        this.disapP.style = "opacity:"+b+";";
      }else{this.disapP.style = "opacity:1;";}
      if(this.scrollPos>this.designDiv){
        let a = 1-(((this.scrollPos - this.designDiv)/1000)*2);
        let b = a.toFixed(2);

        // console.log(b);
        this.designDivOverlay.style = "background: rgba(0, 0, 0,"+b+");";
      }
      if(this.scrollPos>this.securityDiv){
        let a = 1-(((this.scrollPos - this.securityDiv)/1000)*2);
        let b = a.toFixed(2);
        this.disapS.style = "opacity:"+b+";";
      }else{this.disapS.style = "opacity:1;";}
      if(this.scrollPos>this.overlHexTop){
        let a = 1-(((this.scrollPos - this.overlHexTop)/1000)*2);
        let b = a.toFixed(2);

        // console.log(b);
        this.hexOverl.style = "background: rgba(0, 0, 0,"+b+");";
      }
  }

}
