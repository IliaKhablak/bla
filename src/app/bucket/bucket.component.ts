import { Component, OnInit } from '@angular/core';
import {BucketService} from '../services/bucket.service';
import {Angular2TokenService} from "angular2-token";
import {ProdService} from '../services/prod.service';
import {List} from '../list';
import {Router} from '@angular/router';




@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.sass']
})
export class BucketComponent implements OnInit {
	id:number;
	lists:List[];
  url:string;

  constructor(
  	private bucketService:BucketService,
  	private auth:Angular2TokenService,
  	private prodService:ProdService,
    private router:Router
  ) {
    window.scrollTo(0, 0);
  		this.bucketService.getBucket().subscribe(res=>{
  			this.lists = res.json();
  		});
  }

  ngOnInit() {}

  addToBucket(id:number){
  	this.bucketService.addToBucket(id).subscribe(res=>{
  		this.bucketService.buckets = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucketService.amount = a.reduce((a, b) => a + b, 0);
  	});
  }

  deleteFromBucket(id:number){
  	this.bucketService.deleteFromBucket(id).subscribe(res=>{
  		this.bucketService.buckets = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucketService.amount = a.reduce((a, b) => a + b, 0);
  	});
  }

  deleteFromBucket2(id:number){
  	this.bucketService.deleteFromBucket2(id).subscribe(res=>{
  		this.bucketService.buckets = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucketService.amount = a.reduce((a, b) => a + b, 0);
  	});
  }

  goToShow(id:number):void {
    let postLink = ['/prods', id];
    this.router.navigate(postLink);
  }
}
