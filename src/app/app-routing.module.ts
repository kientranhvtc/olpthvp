import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersListComponent} from './userslist/userslist.component';
import {DatabaseComponent} from './database/database.component';
import {RegisterComponent} from './register/register.component';
import {UserInfoComponent} from './userinfo/userinfo.component';
import {ChangePasswordComponent} from './changepassword/changepassword.component';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './resetpassword/resetpassword.component';
import {HandleEmailComponent} from './handleemail/handleemail.component';
import {FinalUsersListComponent} from './finaluserlist/finalusers.component';


const routes: Routes = [
    /*{path: '', redirectTo: '/register', pathMatch: 'full'},*/
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'userslist', component: FinalUsersListComponent},
    {path: 'database', component: DatabaseComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'userinfo', component: UserInfoComponent,
    },
    {
        path: 'changepassword', component: ChangePasswordComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'resetpassword', component: ResetPasswordComponent
    },
    {
        path: 'handleemail', component: HandleEmailComponent
    },
    {
        path: 'final', component: FinalUsersListComponent
    }
    /*{ path: 'heroes',     component: HeroesComponent },
     { path: 'admin', component: Admin}*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
