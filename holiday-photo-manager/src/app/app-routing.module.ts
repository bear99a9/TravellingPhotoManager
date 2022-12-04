import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PhotoDisplayComponent } from './components/photo-display/photo-display.component';
import { ApiDocumentationComponent } from './components/api-documentation/api-documentation.component';

const routes: Routes = [
{ path: 'log-in', component: SigninComponent },
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
{path: 'upload', component: FileUploadComponent, canActivate: [AuthGuard]},
{path: 'manage-photos', component: PhotoDisplayComponent, canActivate: [AuthGuard]},
{path: 'photos', component: PhotoDisplayComponent, canActivate: [AuthGuard]},
{path: 'swagger', component: ApiDocumentationComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: 'log-in'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
