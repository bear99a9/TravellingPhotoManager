import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthInterceptor } from './shared/interceptors/auth-config.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoDisplayComponent } from './components/photo-display/photo-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ApiDocumentationComponent } from './components/api-documentation/api-documentation.component';
import { UploadFilesComponent } from './components/file-upload/upload-files/upload-files.component';
import { UploadFeaturedFilesComponent } from './components/file-upload/upload-featured-files/upload-featured-files.component';
import { ErrorModalComponent } from './shared/error/error-modal/error-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetRequestComponent } from './components/password-reset-request/password-reset-request.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './components/google-map/google-map.component'

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HomeComponent,
    SigninComponent,
    PhotoDisplayComponent,
    FooterComponent,
    HeaderComponent,
    ApiDocumentationComponent,
    UploadFilesComponent,
    UploadFeaturedFilesComponent,
    ErrorModalComponent,
    SpinnerComponent,
    PasswordResetComponent,
    PasswordResetRequestComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
