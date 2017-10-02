/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';


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

    signOut(): void {
        this.afAuth.auth.signOut();
    }
}

