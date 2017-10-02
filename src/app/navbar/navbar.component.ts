/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
    user: firebase.User;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.user = user;
        });
    }
}

