import { Component, OnInit } from '@angular/core';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {BucketService} from '../services/bucket.service';



@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.sass']
})
export class ProdListComponent implements OnInit {

	prods:Prod[];

  constructor(
    private prodService:ProdService, 
    private router:Router,
    private bucket:BucketService
  ) { }

  ngOnInit() {
  	let timer = Observable.timer(0, 5000);
  	timer.subscribe(() => this.getProds());
  }


  getProds(){
  	this.prodService.getProds()
  	 .subscribe(prods => {this.prods = prods});
  }

  goToShow(prod:Prod):void {
    let postLink = ['/prods', prod.id];
    this.prodService.id = prod.id;
    this.router.navigate(postLink);
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
}
