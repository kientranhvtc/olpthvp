import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersListComponent} from './userslist/userslist.component';
import {DatabaseComponent} from './database/database.component';


const routes: Routes = [
  /*{ path: '', redirectTo: '/userslist', pathMatch: 'full' },*/
  { path: 'home',  component: HomeComponent },
  { path: 'userslist', component: UsersListComponent },
  {path: 'database', component: DatabaseComponent}
  /*{ path: 'heroes',     component: HeroesComponent },
  { path: 'admin', component: Admin}*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
