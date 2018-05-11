import { Component, OnInit, trigger, state, animate, transition, style} from '@angular/core';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {BucketService} from '../services/bucket.service';
import * as $ from 'jquery';




@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.sass'],
  animations: [
        trigger(
      'enterAnimation', [
        transition('void => *', [
          style({opacity: 0}),
          animate('400ms', style({opacity: 1}))
        ]),
        transition('* => void', [
          style({opacity: 1}),
          animate('400ms', style({opacity: 0}))
        ])
      ]
    )]
})
export class ProdListComponent implements OnInit {

  bla:boolean = false;
  filteredItems:any;
 
  

  constructor(
    public prodService:ProdService, 
    private router:Router,
    public bucket:BucketService
  ) {
    let self = this;
    this.prodService.getProds()
     .subscribe(prods => {
       this.prodService.prods = prods;
       let z = 0;
       self.prodService.cats = []
       prods.forEach(function (el) {
             if (self.prodService.abc(el.category, self.prodService.cats)){
             }else{
               self.prodService.cats[z] = (el.category);z+=1;
             }
           })
     });
  }

  ngOnInit() {
  }

  goToShow(prod:Prod):void {
    let postLink = ['/prods', prod.id];
    this.prodService.id = prod.id;
    this.router.navigate(postLink);
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
    // this.bucket.openDrop();
  }

  assignCopy(){
   this.filteredItems = Object.assign([], this.prodService.prods);
  }

  filterItem(value){
     if(!value) this.assignCopy(); //when nothing has typed
     this.filteredItems = Object.assign([], this.prodService.prods).filter(
       // item=>console.log(item.title)
        item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
     )
  }

}
