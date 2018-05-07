import { Component, OnInit, trigger, state, animate, transition, style} from '@angular/core';
import {Prod} from '../prod';
import {ProdService} from '../services/prod.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {BucketService} from '../services/bucket.service';



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

	prods:Prod[];
  bla:boolean = false;
  filteredItems:any;
  shprod:Prod

  constructor(
    public prodService:ProdService, 
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
      this.bucket.buckets = res.json();
      let a = [];
      res.json().forEach(function(el){
        a.push(el.number);
      });
      this.bucket.amount = a.reduce((a, b) => a + b, 0);
    });
    // this.bucket.openDrop();
  }

  addclass(event){
    event.target.classList.toggle('spinable');
    window.setTimeout(() => {
      event.target.classList.remove('spinable');
    }, 1000);
  }

  assignCopy(){
   this.filteredItems = Object.assign([], this.prods);
  }

  filterItem(value){
     if(!value) this.assignCopy(); //when nothing has typed
     this.filteredItems = Object.assign([], this.prods).filter(
       // item=>console.log(item.title)
        item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
     )
  }

  smdispbucket(prod:Prod){
    this.shprod = prod;
    window.setTimeout(() => {
      this.shprod = null;
    }, 4000);
  }
}
