// import {Injectable} from '@angular/core';
// import { Angular2TokenService } from 'angular2-token';
// import {BucketService} from '../services/bucket.service';



// @Injectable()
// export class BacketVariable {
// 	private amount:number;

// 	constructor(private auth:Angular2TokenService,private bucket:BucketService){
// 		let self = this;
// 		this.auth.validateToken().subscribe(res=>{
// 			this.bucket.getBucket(res.json().data.id).subscribe(res=>{
// 				this.amount = 0;
// 				res.json().forEach(function(el){
// 					self.amount = self.amount + el.number;
// 				})
// 				console.log(self.amount);
// 			});
// 		});
// 	}

// 	public getAmount(){
// 		return this.amount;
// 	}
// }