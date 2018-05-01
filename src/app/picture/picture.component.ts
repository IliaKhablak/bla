import { Component, OnInit, EventEmitter, ViewChild,  ElementRef } from '@angular/core';
import {ActivatedRoute,Params, Router} from '@angular/router';
import {MaterializeAction} from "angular2-materialize";
import * as $ from 'jquery';


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

  constructor(private router:Router, private route:ActivatedRoute) {
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
      this.imageURLs = [this.imageURLs[0], ...this.imageURLs]; // duplicate the first iamge
      this.carouselElement.nativeElement.classList.toggle('initialized');
      this.actions.emit('carousel');
    }, 1000);
  	// this.carouselElement.
  	// this.carouselElement.nativeElement.classList.toggle("initialized");
  	// this.actions.emit("carousel");
  }

  ngOnInit() {
  }

}
