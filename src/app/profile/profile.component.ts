import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ProdService} from '../services/prod.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public authService:AuthService,
              private router:Router,
              private prod: ProdService
  ) {
    document.getElementById('parallax').scrollTo(0,0);
    this.prod.btntoggle = false;
    window.scrollTo(0, 0);
  }

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  ngOnInit() {
  }

  deleteAccount(){
    let self = this;
    if(window.confirm('Are sure you want to delete this account?')){
      this.authService.deleteAccount().subscribe(
        () => {
          this.router.navigate(['/']);
        }
      )
    }
  }

}
