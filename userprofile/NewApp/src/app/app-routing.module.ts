import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SignupComponent } from './Signup/Signup.component'
import { LoginComponent } from './Login/Login.component'
import { UserProfileComponent } from './User-Profile/User-Profile.component';
import { AuthGuard } from './guards/auth.guards';



const routes: Routes = [
  { path: '', redirectTo: 'Signup', pathMatch: 'full' },
  { path: 'Signup', component: SignupComponent },
  { path: 'Login', component: LoginComponent },
  {
    path: 'UserProfile', component: UserProfileComponent,
    canActivate: [AuthGuard]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
