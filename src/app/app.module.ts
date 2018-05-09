import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from './services/auth.service';
import {ProdService} from './services/prod.service';
import { ProdListComponent } from './prod-list/prod-list.component';
import { ProdShowComponent } from './prod-show/prod-show.component';
import { ProdNewComponent } from './prod-new/prod-new.component';
import { AngularDraggableModule } from 'angular2-draggable';
import {ImageZoomModule} from 'angular2-image-zoom';
import { BucketComponent } from './bucket/bucket.component';
import {BucketService} from './services/bucket.service';
import { Ng2PicaModule } from 'ng2-pica';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    ProdListComponent,
    ProdShowComponent,
    ProdNewComponent,
    BucketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    HttpModule,
    FormsModule,
    AngularDraggableModule,
    ImageZoomModule,
    Ng2PicaModule,
    BrowserAnimationsModule
  ],
  providers: [
  Angular2TokenService,
  AuthGuard, 
  AuthService, 
  ProdService, 
  BucketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
