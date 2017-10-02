import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';
@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html',
})
export class ChangePasswordComponent implements OnInit {
    firebaseUser: firebase.User;
    old_password: string;
    new_password1: string;
    new_password2: string;
    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.firebaseUser = user;
            if (user) {
                // there is an user login
            } else {
                // there is no user login
                this.router.navigate(['/login']);
            }
        });
    }

}
