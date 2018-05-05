import {Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {BucketService} from '../services/bucket.service';
import {Angular2TokenService} from "angular2-token";
import {MaterializeDirective} from "angular2-materialize";
import {ProdService} from '../services/prod.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  // sidenavActions = new EventEmitter<any>();
  // sidenavParams = [];

  constructor(
    public authService:AuthService, 
    private router:Router,
    public bucketService:BucketService,
    public auth:Angular2TokenService,
    public prodService:ProdService
  ) {
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

  // showSidenav(): void {
  //   this.sidenavParams = ['show'];
  //   this.sidenavActions.emit('sideNav');
  // }

}