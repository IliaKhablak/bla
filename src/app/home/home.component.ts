import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {ProdService} from '../services/prod.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';

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
  firstPTop:number;
  secondPTop:number;
  mouseOvered:boolean;
  mouseOvered3:boolean;
  mouseOvered2:boolean;
  mouseOvered4:boolean;  
  pchanged2:boolean;
  pchanged:boolean;
  buttonFixed:number;
  buttonFixed2:number;
  buttonFixed3:any;
  status:boolean = false;
  imgs:string[]=[
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg",
    "/assets/images/1.jpg"
  ];

  constructor(private prod:ProdService, private router:Router) {
  	// document.getElementById('parallax').scrollTo(0,0);

  	
  }

  ngOnInit() {
    this.prod.btntoggle = false;
    this.prod.nav = false;
    this.wow = $('#parallax-try-id');
    this.bla3 = $('#parallax-try-id3');
    let a = $('#parallax-try-id2');
    let b = a.offset().top;
    let c = a.height();
    this.wow1 = b+c-this.wow2;
    let q = $('#parallax-try-id4');
    let w = q.offset().top;
    let e = q.height();
    this.bla1 = w+e-this.wow2;
    this.disapW = $('#disapW');
    this.disapP = $('#disapP');
    this.disapS = $('#disapS');
    this.disapPTop = w+this.wow2+200;
    let r = $('#designDiv');
    let t = r.offset().top;
    let y = r.height();
    this.designDiv = t+y-this.wow2;
    this.designDivOverlay = $('#parallax-try-id5');
    let u = $('#securityDiv');
    let i = u.offset().top;
    let o = u.height();
    this.securityDiv = t+y+this.wow2;
    this.hexOverl = $('#hexoverl');
    this.overlHexTop = i+o-this.wow2;
    this.firstPTop = $('#firstPTop').offset().top;
    this.secondPTop = $('#secondPTop').offset().top;
    // console.log("LOOK HERE!",this.bla1+this.wow2);
    this.buttonFixed = t;
    this.buttonFixed2 = t+y-this.wow2-100;
    this.buttonFixed3 = $('#contactMeButton');
    // console.log("POSITION HERE!",this.wow1);

  }

  doSomething(){
    // console.log(this.status);
    this.status = !this.status;
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

  sendMeThere(str:string){
    console.log(str);
    window.location.href = str;
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
        this.wow.css("background","rgba(0, 0, 0,"+b+")");
      }
      if(this.scrollPos>this.bla1){
        let a = 1-(((this.scrollPos - this.bla1)/1000)*2);
        let b = a.toFixed(2);
        this.bla3.css("background","rgba(0, 0, 0,"+b+")");
      }
      if(this.scrollPos>this.bla1+this.wow2){this.bla3.css("display","none")}else{this.bla3.css("display","block")}
      if(this.scrollPos>200){
        let a = 1-(((this.scrollPos - 200)/1000)*2);
        let b = a.toFixed(2);
        this.disapW.css("opacity",b);
      }else{this.disapW.css("opacity",1)}
      if(this.scrollPos>this.disapPTop){
        let a = 1-(((this.scrollPos - this.disapPTop)/1000)*2);
        let b = a.toFixed(2);
        this.disapP.css("opacity",b);
      }else{this.disapP.css("opacity",1)}
      if(this.scrollPos>this.designDiv){
        let a = 1-(((this.scrollPos - this.designDiv)/1000)*2);
        let b = a.toFixed(2);
        this.designDivOverlay.css("background","rgba(0, 0, 0,"+b+")");
      }
      if(this.scrollPos>this.securityDiv){
        let a = 1-(((this.scrollPos - this.securityDiv)/1000)*2);
        let b = a.toFixed(2);
        this.disapS.css("opacity",b);
      }else{this.disapS.css("opacity",1)}
      if(this.scrollPos>this.overlHexTop){
        let a = 1-(((this.scrollPos - this.overlHexTop)/1000)*2);
        let b = a.toFixed(2);
        this.hexOverl.css("background","rgba(0, 0, 0,"+b+")");
      }
      if(this.scrollPos>this.overlHexTop+this.wow2){this.hexOverl.css("display","none")}else{this.hexOverl.css("display","block")}
      if(this.scrollPos>this.firstPTop){
        $('.firstP').addClass("firstPChanged");
      }else{
        $('.firstP').removeClass("firstPChanged");
      }
      if(this.scrollPos>this.secondPTop){
        $('.secondP').addClass("firstPChanged");
      }else{
        $('.secondP').removeClass("firstPChanged");
      }
      if(this.scrollPos>this.buttonFixed && this.scrollPos<this.buttonFixed2){
        this.buttonFixed3.addClass("changeColor");
      }else{this.buttonFixed3.removeClass("changeColor")}
  }

}
