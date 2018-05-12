import { Component, OnInit, EventEmitter, Input, ViewChild, HostListener} from '@angular/core';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterializeAction, MaterializeDirective} from "angular2-materialize";
import * as $ from 'jquery';
import {Comment} from '../comment';
import {BucketService} from '../services/bucket.service';
import { Ng2PicaService } from 'ng2-pica';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-prod-show',
  templateUrl: './prod-show.component.html',
  styleUrls: ['./prod-show.component.sass']
})
export class ProdShowComponent implements OnInit {
  @ViewChild('carousel') carouselElement; 
  actions = new EventEmitter<string>();
	id: number;
  AWS = require('aws-sdk');
  
  comments:Comment[];
  prod = new Prod;
  comment = new Comment;
  err:string;
  images:any[] = [[]];
  sucess:boolean = false;

  constructor(
  	public prodService:ProdService, 
  	private route:ActivatedRoute,
  	private router:Router,
    public auth:AuthService,
    public bucket:BucketService,
    private pic:Ng2PicaService
          ) { 

    this.prodService.btntoggle = false;
    // $('.parallax').scrollTo(0, 0);
    this.route.params.subscribe(
      params => {this.id = params['id']}
    )
    let self = this;
    this.prodService.getProd(this.id).subscribe(res=>{
        this.comments = res.json().comments;
        this.prodService.sendProd(res.json().prod);
    })
    
    this.prodService.eventCallback$.subscribe(()=>{
      this.carouselElement.nativeElement.classList.toggle('initialized');
      this.actions.emit('carousel');
    });
    this.prodService.eventCallback2$.subscribe(res=>{
      this.prod=res;
      let a = 0;
        let b = 0;
        this.images = [[]];

        this.prod.image.split(',').forEach(function(el){
          if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
        })
        console.log(this.images);
        this.carouselElement.nativeElement.classList.toggle('initialized');
        this.actions.emit('carousel');
    });
  }

  ngOnInit() {
    document.getElementById('parallax').scrollTo(0,0);
    window.setTimeout(() => {
      let i = document.getElementsByClassName('indicator-item');
      for(let a = 0; a < i.length; a+=1){
        i[a].className += ' blue';
      }
    }, 2000);
    
  }

 @HostListener('click', ['$event'])
 onClick(){
   $(".carousel-item").children().css('opacity','0');
   $('a.active').children().css('opacity','1');
 }

  deleteProd(id:number){
    if(window.confirm('Are sure you want to delete this item ?')){
      let self = this;
      this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
      let a = this.prod.image.split(',');
      a.forEach(function(element){
        let s3 = new self.AWS.S3().deleteObject({Bucket: self.prodService.env.bucket, Key: element},function(err, data) {
          if (err) {} 
          else     {}        
        }); 
      });
    	this.prodService.deleteProd(id)
    	  .subscribe(res=>{
          let z = 0;
          self.prodService.cats = []
          res.json().forEach(function (el) {
             if (self.prodService.abc(el.category, self.prodService.cats)){
             }else{
               self.prodService.cats[z] = (el.category);z+=1;
             }
             
           })
          this.prodService.prods = res.json();
          this.router.navigate(['/prods']);
        });
      this.bucket.getBucket().subscribe(res=>{
        let a = [];
        res.json().forEach(function(el){
          a.push(el.number);
        });
        this.bucket.amount = a.reduce((a, b) => a + b, 0);
      });
    }
  }

  

  addComment(comment:Comment){
    if (this.auth.userSignedIn$){
      let user_id = this.auth.user.id;
      let user_email = this.auth.user.email;
      this.prodService.addComment(this.prod.id, comment.text, user_id, user_email).subscribe(res=>this.comments=res.json());
    }else{
      this.prodService.addComment(this.prod.id, comment.text, null, null).subscribe(res=>this.comments=res.json());
    }
  }

  deleteComment(comment:Comment){
    this.prodService.deleteComment(comment.id, this.prod.id).subscribe(res=>this.comments=res.json());
  }

  addToBucket(id:number){
    this.bucket.addToBucket(id).subscribe(res=>{
      this.bucket.buckets = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucket.amount = a.reduce((a, b) => a + b, 0);
    });
  }

  flooring(number){
    return Math.floor(12/number);
  }

  // @HostListener('click') onClick() {
  //   if (document.getElementsByClassName("materialboxed").classList.contains('active')){this.prodService.nav = !this.prodService.nav}else{}
  // }
  simpCheck(event){
    if(event.target.classList.contains('active')){this.prodService.nav = true}else{this.prodService.nav = false}
  }

}
