import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProdListComponent} from './prod-list/prod-list.component';
import {ProdShowComponent} from './prod-show/prod-show.component';
import {ProdNewComponent} from './prod-new/prod-new.component';
import {BucketComponent} from './bucket/bucket.component';


const routes: Routes = [
	{path: '', component: HomeComponent, pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
	{path: 'prods', component: ProdListComponent},
	{path: 'prods/:id', component: ProdShowComponent},
	{path: 'prod/new', component: ProdNewComponent},
	{path: 'bucket', component: BucketComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
