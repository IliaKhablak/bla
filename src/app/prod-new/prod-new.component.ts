import { Component,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {MaterializeAction} from "angular2-materialize";
import * as $ from 'jquery';
import { Ng2PicaService } from 'ng2-pica';


@Component({
  selector: 'app-prod-new',
  templateUrl: './prod-new.component.html',
  styleUrls: ['./prod-new.component.sass']
})
export class ProdNewComponent {
	prod = new Prod;
	err:any;
	urls:string[] = [];
  img_upload:boolean = false;
  img_storage:string = "";
  AWS = require('aws-sdk');


  constructor(
  	private router:Router, 
  	public prodService:ProdService,
    private pic:Ng2PicaService
  ) {}

	createProd(prod:Prod){
    console.log(prod.category);
    let self = this;
    prod.image = this.img_storage.slice(0, -1);
		this.prodService.createProd(prod)
			.subscribe(
				data=>{
          let a = prod.image.split(',');
          a.forEach(function(element){
       

            let s3 = new self.AWS.S3().copyObject({Bucket: self.prodService.env.bucket+'/'+data.id, CopySource: self.prodService.env.bucket+'/'+element, Key: element}, function(err, data) {
             if (err) console.log(err, err.stack); // an error occurred
             else     console.log(data);

             let s3 = new self.AWS.S3().deleteObject({Bucket: self.prodService.env.bucket, Key: element},function(err, data) {
               if (err) console.log(err, err.stack); // an error occurred
               else     console.log(data);           // successful response
             });           // successful response
           });
          })
					this.prodService.closeModal();
          this.img_upload = false;
          $('img').remove();
          $('.file-path').val('');
          $('#needreset').val('');
				},
				error=>{
					this.err = error;
				}
			)
	}

  getFile(fileInput:any){
    this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": this.prodService.env.id, "secretAccessKey": this.prodService.env.key}});
    this.img_storage = '';
    let file = fileInput.target.files;
    for (let i=0; i < file.length; i++){
      this.pic.resize([file[i]], 600, 600).subscribe(res=>this.fileEvent(res));
    }
  }

  fileEvent(data:any){
    this.img_upload = true;
    let self = this;
    let params = {Bucket: this.prodService.env.bucket, Key: data.name, Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(err, s3res) { 
      // console.log('errors:',err);
      console.log('res:',s3res.Key);
      let a = self.urls.length;
      self.urls[a] = 'https://s3-ap-southeast-1.amazonaws.com/justforfunbucket2018/'+s3res.Key;
      // $('#puscontainer').after("<img style='width:30px;height:auto;' src='https://s3-ap-southeast-1.amazonaws.com/justforfunbucket2018/"+s3res.Key+"'>");
      self.img_storage = self.img_storage + s3res.Key+',';
    });
  }

}
