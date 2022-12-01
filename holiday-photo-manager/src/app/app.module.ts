import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {HttpClientModule} from '@angular/common/http';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    UploadFilesComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
