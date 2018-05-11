import {Component, OnInit, ViewChild, HostListener, Inject, trigger, state, animate, transition, style} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {BucketService} from '../services/bucket.service';
import {MaterializeDirective} from "angular2-materialize";
import {ProdService} from '../services/prod.service';
import * as $ from 'jquery';





@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  animations: [
     trigger(
      'enterAnimation', [
        transition('void => *', [
          style({opacity: 0}),
          animate('400ms', style({opacity: 1}))
        ]),
        transition('* => void', [
          style({opacity: 1}),
          animate('400ms', style({opacity: 0}))
        ])
      ]
     ),
     trigger(
      'popupAnim', [
        transition('void => *', [
          style({transform: 'translateY(100%)',opacity: 0}),
          animate('400ms', style({transform: 'translateY(0)',opacity: 1}))
        ]),
        transition('* => void', [
          style({transform: 'translateY(0)',opacity: 1}),
          animate('400ms', style({transform: 'translateY(-100%)',opacity: 0}))
        ])
      ]
     )
    ]
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  
  params = {hover: true, constrainWidth:false};
  isHidden: boolean = false;
  // state:string = 'enter';
  show:boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  adv:boolean = false;
  adv2:boolean = false;
  parHide:boolean = false;
  parHide2:boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService:AuthService, 
    private router:Router,
    public bucketService:BucketService,
    public prodService:ProdService) 
  {
    window.setTimeout(() => {
      this.show = true;
    }, 1000);
    window.setTimeout(() => {
      this.show2 = true;
    }, 1500);
    window.setTimeout(() => {
      this.show3 = true;
    }, 2000);
    window.setTimeout(() => {
      this.adv2 = true;
    }, 2500);
    window.setTimeout(() => {
      this.adv = true;
    }, 2800);
    window.setTimeout(() => {
      this.adv = false;
      this.adv2 = false;
    }, 4000);

    
  }

  ngOnInit(){
  }

  logOut(){
    this.authService.logOutUser().subscribe();
  }

  presentAuthDialog(mode?: 'login'| 'register'){
    this.authDialog.openDialog(mode);

  }

  openNewProd(){
     this.prodService.openModal();
  }

  getParams(){
    return this.params;
  }

  @HostListener('window:scroll', ['$event']) 

  onScrollEvent($event){
    
   const verticalOffset = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;
   if (verticalOffset > 250) {this.isHidden = true}else{this.isHidden = false}
   // $(".img_par").css({
   //   "transform" : "translate(0%, "+verticalOffset/4+"%)"
   // })
   // if (verticalOffset > 2000)
   //   {this.parHide2 = true}else{ this.parHide2 = false}
   // {$('.par1').after("<div class='parallax-container' style='position: absolute;width: 100%;height: 2000px;margin-top: 1980px;'><div class='parallax' materialize='parallax'><img src='./assets/images/city2.jpg'></div></div>");}else{}
  } 

  @HostListener('window:change', ['$event']) 
  onChangeEvent($event){
    if ($('.elem').last().offset().top > 1800)
     {this.parHide = true}else{ this.parHide = false}
  }
}
