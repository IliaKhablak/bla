import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

	constructor(private tokenService:Angular2TokenService){
		this.tokenService.init ({
		    apiBase: 'https://infinite-reaches-26736.herokuapp.com/'
		});
	}
}

