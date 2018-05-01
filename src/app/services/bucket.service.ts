import { Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Angular2TokenService} from "angular2-token";



@Injectable()
export class BucketService {
	headers: Headers;
	options: RequestOptions;
  amount:number = 0;

	constructor(private http:Http, private auth:Angular2TokenService) {
  	this.headers = new Headers({'Content-Type':'application/json'});
	  this.options = new RequestOptions({headers:this.headers});
    let self = this;
      this.getBucket().subscribe(res=>{
        let a = [];
        res.json().forEach(function(el){
          a.push(el.number);
        });
        self.amount = a.reduce((a, b) => a + b, 0);
      });
  }

  getBucket(){
  	return this.http.get('https://infinite-reaches-26736.herokuapp.com/buckets');
  }

  addToBucket(id:number){
  	return this.http.get('https://infinite-reaches-26736.herokuapp.com/addtobucket/'+id);
  }

  deleteFromBucket(id:number){
  	return this.http.get('https://infinite-reaches-26736.herokuapp.com/deletefrombucket/'+id);
  }

  deleteFromBucket2(id:number){
  	return this.http.get('https://infinite-reaches-26736.herokuapp.com/deletefrombucket2/'+id);
  }

}