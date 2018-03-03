/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
    user: firebase.User;
    isadmin = false;

    constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.user = user;
            this.isadmin = false;
            if (user) {
                this.db.object('/users/' + user.uid + '/role').subscribe((snapshot) => {
                    console.log(snapshot.$value);
                    this.isadmin = (snapshot.$value === 'admin');
                    console.log(this.isadmin);
                });


            }
        });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
    }

    close_Navbar(): void {
        // document.documentElement.classList.remove('nav-open');
        if (document.getElementsByClassName('has-image').length > 0) {
            document.getElementById('button_navbar').click();
        }
    }
}