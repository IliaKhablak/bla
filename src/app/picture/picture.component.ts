import { Component, OnInit, EventEmitter, ViewChild,  ElementRef } from '@angular/core';
import {ActivatedRoute,Params, Router, NavigationEnd, Event} from '@angular/router';
import {MaterializeAction} from "angular2-materialize";
import * as $ from 'jquery';
import {ProdService} from '../services/prod.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {
	@ViewChild('carousel') carouselElement; 
	actions = new EventEmitter<string>();
	imageURLs:string[] = [];
	showInitialized = false;

  constructor(private router:Router, private route:ActivatedRoute, private prod:ProdService) {
  	let self = this;
  	this.route.queryParams.subscribe(params=>{
  		let a = 0;
  		params['image'].split(',').forEach(function(el){
  			self.imageURLs[a] = 'https://s3-ap-southeast-1.amazonaws.com/justforfunbucket2018/'+el;
  			a+=1;
  		});
  		// console.log(this.imageURLs);
  	})
  	window.setTimeout(() => {
      // this.imageURLs = [this.imageURLs[0], ...this.imageURLs]; // duplicate the first iamge
      this.carouselElement.nativeElement.classList.toggle('initialized');
      this.actions.emit('carousel');
    }, 1000);
  	// this.carouselElement.
  	// this.carouselElement.nativeElement.classList.toggle("initialized");
  	// this.actions.emit("carousel");
    // console.log('wow');
    this.prod.nav = false;
  }

  ngOnInit() {
    this.router.events.subscribe(res=>{
      if(res instanceof NavigationEnd ){
        let a = RegExp('/picture/');
        let b = res.url;
        if (a.test(b)){}else{this.prod.nav = true}
      }else{}
    })
  }

}
