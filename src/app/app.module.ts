import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {UsersListComponent} from './userslist/userslist.component';
import {RegisterComponent} from './register/register.component';
import {DatabaseComponent} from './database/database.component';
import {FormsModule} from '@angular/forms';
import {LoadingComponent} from './loading/loading.component';
import {LoadingService} from './services/loading-service';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from './confirm/confirm.component';

@NgModule({
    declarations: [
        AppComponent, NavbarComponent, HomeComponent, FooterComponent, UsersListComponent,
        RegisterComponent, DatabaseComponent, LoadingComponent,
        ConfirmComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AppRoutingModule,
        FormsModule,
        BootstrapModalModule.forRoot({container: document.body})
    ],
    entryComponents: [
        ConfirmComponent
    ],
    providers: [LoadingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
