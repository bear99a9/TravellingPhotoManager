import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthInterceptor } from './shared/interceptors/auth-config.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoDisplayComponent } from './components/photo-display/photo-display.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HomeComponent,
    AboutComponent,
    SigninComponent,
    PhotoDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
