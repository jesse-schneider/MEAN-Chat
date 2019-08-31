import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'group', component: GroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
