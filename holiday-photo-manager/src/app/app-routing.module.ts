import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
{ path: 'log-in', component: SigninComponent },
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
{path: 'upload', component: FileUploadComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: 'log-in'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
