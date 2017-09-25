import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersListComponent} from './userslist/userslist.component';
import {DatabaseComponent} from './database/database.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
    /*{path: '', redirectTo: '/register', pathMatch: 'full'},*/
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'userslist', component: UsersListComponent},
    {path: 'database', component: DatabaseComponent},
    {path: 'register', component: RegisterComponent}
    /*{ path: 'heroes',     component: HeroesComponent },
     { path: 'admin', component: Admin}*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
