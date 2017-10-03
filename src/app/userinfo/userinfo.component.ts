import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';
import {Section} from '../model/section.model';
@Component({
    selector: 'app-userinfo',
    templateUrl: 'userinfo.component.html',
})
export class UserInfoComponent implements OnInit {
    firebaseUser: firebase.User;
    sections: Section[] = [];
    user: User = new User('hoangdd87@gmail.com', 'Đào Đức Hoàng', '43/41.01', '', '0989596889', '', '-Kuxe7mus8V03jlLiIuv');

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.firebaseUser = user;
            if (user) {
                // there is an user login
                this.db.object('users/' + user.uid, {preserveSnapshot: false}).subscribe((snapshot) => {
                    this.user = snapshot;
                    console.log(this.user);
                });
                this.db.list('/sections', {preserveSnapshot: false}).subscribe((snapshots) => {
                    this.sections = snapshots;
                });
            } else {
                // there is no user login
                this.router.navigate(['/login']);
            }
        });


    }

    onSubmit(): void {

    }

}
