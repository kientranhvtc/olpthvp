/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
    user: firebase.User;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.user = user;
        });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
    }

    gotoPage(page: string) {
        this.router.navigate([page]);
    }

    toggleCollapse(): void {
        // this.show = !this.show;
    }

    close_Navbar(): void {
        // document.documentElement.classList.remove('nav-open');
        if (document.getElementsByClassName('has-image').length > 0) {
            document.getElementById('button_navbar').click();
        }
    }
}

// navbar-collapse justify-content-end collapse
// collapse navbar-collapse justify-content-end has-image
// navbar-collapse justify-content-end has-image collapse show
// navbar-collapse justify-content-end has-image collapse show

