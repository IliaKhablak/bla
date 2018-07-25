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
    this.prodService.btntoggle = true;
    let self = this;
  }

  ngOnInit() {
    window.scrollTo(0,0);
    // document.getElementById('parallax').scrollTo(0,0);
    // window.setTimeout(() => {
    //   let lastEl = document.getElementsByClassName('card-action')[document.getElementsByClassName('card-action').length - 1];
    //   let posLast = lastEl.getBoundingClientRect();
    //   // let c = "clip: rect(auto, auto, 1000px, auto);"
    //   // document.getElementsByClassName('back_pic')[0].setAttribute('style',c);
    //   console.log(posLast.bottom);
    // }, 4000);
    
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
     if(!value) {this.filteredItems = null;}else{
       this.filteredItems = Object.assign([], this.prodService.prods).filter(
       // item=>console.log(item.title)
        item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
     )
     } 
  }

}
