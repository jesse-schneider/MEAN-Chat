import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { ImageComponent } from './image/image.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'group', component: GroupComponent, runGuardsAndResolvers: 'always' },
  {path: 'image', component: ImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
