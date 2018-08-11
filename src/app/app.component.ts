import { Component} from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import {ProdService} from './services/prod.service';
import {trigger, animate, transition, style} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
     trigger(
      'enterAnimation', [
        transition('void => *', [
          style({opacity: 1}),
          animate('600ms', style({opacity: 1}))
        ]),
        transition('* => void', [
          style({opacity: 1}),
          animate('600ms', style({opacity: 0}))
        ])
      ]
     )]
})
export class AppComponent {

	bla:boolean = false;

	constructor(private tokenService:Angular2TokenService, public prodService:ProdService){
		this.tokenService.init ({
		    apiBase: 'https://infinite-reaches-26736.herokuapp.com/'
		});
		window.setTimeout(() => {
			this.bla = true;
		}, 5000)
	}

	
}

