import { Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Prod} from '../prod';
import {Env} from '../env';
import {MaterializeAction} from "angular2-materialize";



@Injectable()
export class ProdService {
	modalActions = new EventEmitter<string|MaterializeAction>();
	headers: Headers;
	options: RequestOptions;
	private prodsUrl = 'https://infinite-reaches-26736.herokuapp.com/prods';
	env = new Env;
	id:number;
	cats:string[] = [];
  	catItems:any;
  	prods:Prod[] = [];
  	nav:boolean = true;
	shprod:Prod;



  constructor(private http:Http) {
  	this.headers = new Headers({'Content-Type':'application/json'});
	this.options = new RequestOptions({headers:this.headers});
	this.http.get('https://infinite-reaches-26736.herokuapp.com/env').subscribe(data=>{this.env = data.json();});
  }

  
  	getProds(): Observable<Prod[]>{
		return this.http.get(this.prodsUrl)
			.map((response: Response) => <Prod[]>response.json())
	}

	createProd(prod:Prod){
		return this.http.post(this.prodsUrl,JSON.stringify(prod),this.options)
			.map((res: Response) => res.json());
	}

	getProd(id:number) {
		return this.http.get(this.prodsUrl+"/"+id);
	}

	deleteProd(id:number){
		return this.http.delete(this.prodsUrl+'/'+id, this.options)
	}

	updateProd(prod:Prod): Observable<Prod>{
		const url = `${this.prodsUrl}/${prod.id}`;
		return this.http.put(url,JSON.stringify(prod),this.options).map((res: Response) => res.json())
	}

	addFile(img:string, id:number): Observable<Response>{
		return this.http.post('https://infinite-reaches-26736.herokuapp.com/addfile/'+id,JSON.stringify({image: img}),this.options);
	}

	delFile(img:string, id:number): Observable<Response>{
		return this.http.post('https://infinite-reaches-26736.herokuapp.com/delfile/'+id,JSON.stringify({image: img}),this.options);
	}

	addComment(id:number, text:string, user_id:number, user_email:string): Observable<Response>{
		return this.http.post('https://infinite-reaches-26736.herokuapp.com/addcomment/'+id,{text: text, user_id: user_id, email: user_email},this.options);
	}

	deleteComment(comment_id:number, id:number){
		return this.http.post('https://infinite-reaches-26736.herokuapp.com/deletecomment/'+id,{user_id: comment_id}, this.options);
	}

	openModal() {
	    this.modalActions.emit({action:"modal",params:['open']});
	}

	closeModal() {
	    this.modalActions.emit({action:"modal",params:['close']});
	}

	catShow(value){
	    this.catItems = Object.assign([], this.prods).filter(
	        item => item.category.toLowerCase().indexOf(value.toLowerCase()) > -1
	    )
	}

	smdispbucket(prod:Prod){
	    this.shprod = prod;
	    
	    window.setTimeout(() => {
	      this.shprod = null;
	      
	    }, 4000);
	  }

	abc(val,arr):boolean {
	    for (let i = 0; i < arr.length; i+=1){
	      if (val == arr[i]){return true}else{}
	    }
	    return false;
	  }
}
