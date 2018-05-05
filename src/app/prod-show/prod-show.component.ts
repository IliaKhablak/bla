import { Component, OnInit, EventEmitter, Input} from '@angular/core';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterializeAction} from "angular2-materialize";
import * as $ from 'jquery';
import {Comment} from '../comment';
import {Angular2TokenService} from "angular2-token";
import {BucketService} from '../services/bucket.service';

@Component({
  selector: 'app-prod-show',
  templateUrl: './prod-show.component.html',
  styleUrls: ['./prod-show.component.sass']
})
export class ProdShowComponent implements OnInit {
	id: number;
  images:any = [];
  modalActions = new EventEmitter<string|MaterializeAction>();
  AWS = require('aws-sdk');
  img_upload:boolean = false;
  comments:Comment[];
  prod = new Prod;
  comment = new Comment;


  constructor(
  	private prodService:ProdService, 
  	private route:ActivatedRoute,
  	private router:Router,
    private authService:Angular2TokenService,
    private bucket:BucketService
  ) { 
    this.route.params.subscribe(
      params => {this.id = params['id']}
    )
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() =>{
      this.prodService.getProd(this.id).subscribe(res=>{
        this.prod = res.json().prod;
        this.comments = res.json().comments;
        this.images = this.prod.image.split(',');
      });
    });
  }

  // @Input() prod: Prod;

  ngOnInit() {
  }

  deleteProd(id:number){
    let self = this;
    this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
    let a = this.prod.image.split(',');
    a.forEach(function(element){
      let s3 = new self.AWS.S3().deleteObject({Bucket: self.prodService.env.bucket, Key: element},function(err, data) {
        if (err) {console.log(err, err.stack);} // an error occurred
        else     {console.log(data);}         // successful response
      }); 
    });
  	this.prodService.deleteProd(id)
  	  .subscribe(res=>{console.log(res); this.router.navigate(['/prods'])});
    this.bucket.getBucket().subscribe(res=>{
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucket.amount = a.reduce((a, b) => a + b, 0);
    });
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
        this.prod = data;
        this.images = this.prod.image.split(',');
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
      this.fileEvent(file[i]);
    }
  }

  fileEvent(data:any){
    let self = this;
    this.img_upload = true;
    let params = {Bucket: this.prodService.env.bucket, Key: this.prod.id+'/'+data.name, Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(err, s3res) { 
      let img:string;
      if(self.prod.image){img = ','+s3res.Key}else{img = s3res.Key};
      self.prodService.addFile(img, self.prod.id).subscribe(res => {self.prod = res.json();self.images = self.prod.image.split(',');});
      
    });
  }

  delImg(img:string){
    let self = this;
    this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
    let s3 = new this.AWS.S3().deleteObject({Bucket: this.prodService.env.bucket, Key: img},function(err, data) {
      if (err) {console.log(err, err.stack);} // an error occurred
      else     {
        console.log(data); 
        self.prodService.delFile(img, self.prod.id).subscribe(res => {self.prod = res.json();self.images = self.prod.image.split(',');});
        }         // successful response
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

  goToPicture(prod:Prod){
    this.router.navigate(['/picture',this.prod.id],{queryParams:{image:prod.image}});
  }

  addToBucket(id:number){
    this.bucket.addToBucket(id).subscribe(res=>{
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucket.amount = a.reduce((a, b) => a + b, 0);
    });
  }

  addclass(event){
    event.target.classList.toggle('spinable');
    window.setTimeout(() => {
      event.target.classList.remove('spinable');
    }, 1000);
  }

}
