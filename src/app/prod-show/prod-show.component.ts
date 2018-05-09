import { Component, OnInit, EventEmitter, Input, ViewChild} from '@angular/core';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterializeAction, MaterializeDirective} from "angular2-materialize";
import * as $ from 'jquery';
import {Comment} from '../comment';
import {Angular2TokenService} from "angular2-token";
import {BucketService} from '../services/bucket.service';
import { Ng2PicaService } from 'ng2-pica';


@Component({
  selector: 'app-prod-show',
  templateUrl: './prod-show.component.html',
  styleUrls: ['./prod-show.component.sass']
})
export class ProdShowComponent implements OnInit {
  @ViewChild('carousel') carouselElement; 
  actions = new EventEmitter<string>();
	id: number;
  modalActions = new EventEmitter<string|MaterializeAction>();
  AWS = require('aws-sdk');
  img_upload:boolean = false;
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
    private authService:Angular2TokenService,
    public bucket:BucketService,
    private pic:Ng2PicaService
  ) { 
    window.scrollTo(0, 0);
    this.route.params.subscribe(
      params => {this.id = params['id']}
    )
    let self = this;
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() =>{
      this.prodService.getProd(this.id).subscribe(res=>{
        this.comments = res.json().comments;
      });
    });
    this.prodService.getProd(this.id).subscribe(res=>{
      this.prod = res.json().prod;
      let a = 0;
      let b = 0;
      this.prod.image.split(',').forEach(function(el){
        if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
      })
      this.carouselElement.nativeElement.classList.toggle('initialized');
      this.actions.emit('carousel');
    })
  }

  ngOnInit() {
  }

  deleteProd(id:number){
    if(window.confirm('Are sure you want to delete this item ?')){
      let self = this;
      this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
      let a = this.prod.image.split(',');
      a.forEach(function(element){
        let s3 = new self.AWS.S3().deleteObject({Bucket: self.prodService.env.bucket, Key: element},function(err, data) {
          if (err) {} // an error occurred
          else     {}         // successful response
        }); 
      });
    	this.prodService.deleteProd(id)
    	  .subscribe(res=>{
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

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  update(prod: Prod){
    this.prodService.updateProd(prod)
      .subscribe(data => {
        let self = this;
        this.prod = data;
        let a = 0;
        let b = 0;
        this.images = [[]];
        this.prod.image.split(',').forEach(function(el){
          if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
        })
        self.carouselElement.nativeElement.classList.toggle('initialized');
        self.actions.emit('carousel');
      },
        error => {
          console.log(error)
        }
      );
  }

  getFile(fileInput:any){
    this.img_upload = false;
    this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
    let file = fileInput.target.files;
    for (let i=0; i < file.length; i++){
      this.pic.resize([file[i]], 800, 800, true).subscribe(res=>this.fileEvent(res));
    }
  }

  fileEvent(data:any){
    let self = this;
    this.sucess = false;
    this.img_upload = true;
    let params = {Bucket: this.prodService.env.bucket, Key: this.prod.id+'/'+this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let img:string;
      if(self.prod.image){img = ','+s3res.Key}else{img = s3res.Key};
      self.prodService.addFile(img, self.prod.id).subscribe(res => {
        self.prod = res.json();
        let a = 0;
        let b = 0;
        self.images = [[]];
        self.prod.image.split(',').forEach(function(el){
          if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
        })
        self.carouselElement.nativeElement.classList.toggle('initialized');
        self.actions.emit('carousel');
      });
      
    });
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  delImg(img:string){
    console.log(img); 
    let self = this;
    this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
    let s3 = new this.AWS.S3().deleteObject({Bucket: this.prodService.env.bucket, Key: img},function(err, data) {
      if (err) {console.log('im here@@@@@@@@@@@@@@@@',err)} // an error occurred
      else     {
        // console.log()
        self.prodService.delFile(img, self.prod.id).subscribe(res => {
          self.prod = res.json();
          
          let a = 0;
          let b = 0;
          self.images = [[]];
          self.prod.image.split(',').forEach(function(el){
            if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
          })
          self.carouselElement.nativeElement.classList.toggle('initialized');
          self.actions.emit('carousel');
        });
        }         
    }); 
  }

  addComment(comment:Comment){
    if (this.authService.userSignedIn()){
      let user_id = this.authService.currentUserData.id;
      let user_email = this.authService.currentUserData.email;
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


}
