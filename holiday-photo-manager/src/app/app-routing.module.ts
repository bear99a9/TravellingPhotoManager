import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PhotoDisplayComponent } from './components/photo-display/photo-display.component';
import { ApiDocumentationComponent } from './components/api-documentation/api-documentation.component';
import { LoginGuard } from './shared/guards/login.guard';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetRequestComponent } from './components/password-reset-request/password-reset-request.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';

const routes: Routes = [
{ path: 'log-in', component: SigninComponent, canActivate: [LoginGuard] },
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
{path: 'upload', component: FileUploadComponent, canActivate: [AuthGuard]},
{path: 'manage-photos', component: PhotoDisplayComponent, canActivate: [AuthGuard]},
{path: 'photos', component: PhotoDisplayComponent, canActivate: [AuthGuard]},
{path: 'swagger', component: ApiDocumentationComponent, canActivate: [AuthGuard]},
{path: 'map', component: GoogleMapComponent, canActivate: [AuthGuard]},
{ path: 'reset-password/:accessGuid', component: PasswordResetComponent },
{ path: 'reset-password-request', component: PasswordResetRequestComponent },
{ path: '**', redirectTo: 'log-in'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
