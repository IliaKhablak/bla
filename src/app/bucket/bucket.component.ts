import { Component, OnInit } from '@angular/core';
import {BucketService} from '../services/bucket.service';
import {Angular2TokenService} from "angular2-token";
import {ProdService} from '../services/prod.service';
import {List} from '../list';




@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.sass']
})
export class BucketComponent implements OnInit {
	id:number;
	lists:List[];

  constructor(
  	private bucketService:BucketService, 
  	private auth:Angular2TokenService,
  	private prodService:ProdService
  ) {
  		this.bucketService.getBucket().subscribe(res=>{
  			this.lists = res.json();
  		});
  }

  ngOnInit() {}

  addToBucket(id:number){
  	this.bucketService.addToBucket(id).subscribe(res=>{
  		this.lists = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucketService.amount = a.reduce((a, b) => a + b, 0);
  	});
  }

  deleteFromBucket(id:number){
  	this.bucketService.deleteFromBucket(id).subscribe(res=>{
  		this.lists = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucketService.amount = a.reduce((a, b) => a + b, 0);
  	});
  }

  deleteFromBucket2(id:number){
  	this.bucketService.deleteFromBucket2(id).subscribe(res=>{
  		this.lists = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucketService.amount = a.reduce((a, b) => a + b, 0);
  	});
  }
}
