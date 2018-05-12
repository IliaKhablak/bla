import { Component, OnInit } from '@angular/core';
import {ProdService} from '../services/prod.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private prod:ProdService) {
  	document.getElementById('parallax').scrollTo(0,0);
  	this.prod.btntoggle = false;
  	
  }

  ngOnInit() {
  }

}
