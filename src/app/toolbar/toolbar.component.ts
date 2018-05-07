import {Component, OnInit, ViewChild, HostListener, Inject, trigger, state, animate, transition, style} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {BucketService} from '../services/bucket.service';
import {Angular2TokenService} from "angular2-token";
import {MaterializeDirective} from "angular2-materialize";
import {ProdService} from '../services/prod.service';





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
     )
    ]
    // ),
    //  trigger(
    //    'pickFall', [
    //     transition(':enter', [
    //       style({transform: 'translateY(-100%)', opacity: 0}),
    //       animate('2000ms', style({transform: 'translateY(0)', opacity: 1}))
    //     ]),
    //     transition(':leave', [
    //       style({transform: 'translateY(0)', opacity: 1}),
    //       animate('2000ms', style({transform: 'translateY(-100%)', opacity: 0}))
    //     ])
    //   ]
    // )
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  
  params = {hover: true, constrainWidth:false};
  isHidden: boolean = false;
  // state:string = 'enter';
  show:boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService:AuthService, 
    private router:Router,
    public bucketService:BucketService,
    public auth:Angular2TokenService,
    public prodService:ProdService) 
  {
    window.setTimeout(() => {
      this.show = true;
    }, 5000);
    window.setTimeout(() => {
      this.show2 = true;
    }, 6000);
    window.setTimeout(() => {
      this.show3 = true;
    }, 7000);
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
   // console.log(verticalOffset);
  } 

  // animateMe() {
  //   this.state = (this.state === 'enter' ? 'leave' : 'leave');
  // }

}