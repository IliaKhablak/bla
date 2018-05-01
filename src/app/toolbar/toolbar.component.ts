import {Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ProdNewComponent} from '../prod-new/prod-new.component';
import {List} from '../list';
import {BucketService} from '../services/bucket.service';
import {Angular2TokenService} from "angular2-token";
import {MaterializeDirective} from "angular2-materialize";



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  @ViewChild('prodNew') prodNew: ProdNewComponent;
  sidenavActions = new EventEmitter<any>();
  sidenavParams = [];

  constructor(
    public authService:AuthService, 
    private router:Router,
    private bucketService:BucketService,
    private auth:Angular2TokenService
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
     this.prodNew.openModal();
  }

  showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

}