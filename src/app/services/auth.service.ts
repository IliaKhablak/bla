import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {BucketService} from '../services/bucket.service';

@Injectable()
export class AuthService {

userSignedIn$:any;

  constructor(public authService:Angular2TokenService, private router:Router, private bucket:BucketService) {

    this.authService.validateToken().subscribe(
        res => res.status == 200 ? this.userSignedIn$ = true : this.userSignedIn$ = false
    )
  }

  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$ = false;
          this.router.navigate(['/']);
          return res;
        }
    );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$ = true;
          this.bucket.getBucket(res.json().data.id).subscribe(res=>{
            let a = [];
            res.json().forEach(function(el){
              a.push(el.number);
            })
            this.bucket.amount = a.reduce((a, b) => a + b, 0);
          });
          return res
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
        res => {
          this.userSignedIn$ = true;
          this.bucket.getBucket(res.json().data.id).subscribe(res=>{
            let a = [];
            res.json().forEach(function(el){
              a.push(el.number);
            })
            this.bucket.amount = a.reduce((a, b) => a + b, 0);
          });
          return res
        }
    );

  }

}