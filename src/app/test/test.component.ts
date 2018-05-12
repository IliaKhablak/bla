import { Component, OnInit } from '@angular/core';
import {MaterializeAction, MaterializeDirective} from "angular2-materialize";
import {ProdService} from '../services/prod.service';
import {Prod} from '../prod';
import { Ng2PicaService } from 'ng2-pica';
import * as $ from 'jquery';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

	prod = new Prod;
	images:any[] = [[]];
	img_upload:boolean = false;
	AWS = require('aws-sdk');
	sucess:boolean = false;
	err:string;

  constructor(public prodService:ProdService,private pic:Ng2PicaService) {
  	 this.prodService.eventCallback2$.subscribe(res=>{
  	 	let self = this;
  	 	this.prod = res;
  	 	let a = 0;
        let b = 0;
        this.images = [[]];
        this.prod.image.split(',').forEach(function(el){
          if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
        })
  	 });
  }

  ngOnInit() {
  }

  update(prod: Prod){
    this.prodService.updateProd(prod)
      .subscribe(data => {
        if (prod.category == data.category){
             }else{
               this.prodService.cats.push(data.category);
             } 
        let self = this;
        this.prod = data;
        this.prodService.sendProd(data);
        let a = 0;
        let b = 0;
        this.images = [[]];
        this.prod.image.split(',').forEach(function(el){
          if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
        })
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
        self.prodService.sendProd(res.json());
        let a = 0;
        let b = 0;
        self.images = [[]];
        self.prod.image.split(',').forEach(function(el){
          if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
        })
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
          self.prodService.sendProd(res.json());
          let a = 0;
          let b = 0;
          self.images = [[]];
          self.prod.image.split(',').forEach(function(el){
            if (a < 4){self.images[b][a] = el;a+=1}else{b+=1;a=1;self.images[b] = [el]}
          })
        });
        }         
    }); 
  }

}
