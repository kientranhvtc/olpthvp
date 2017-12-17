import {Component, Input, Output} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {LoadingService} from './services/loading-service';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from './confirm/confirm.component';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    @Input() isAppLoading = false;

    constructor(private db: AngularFireDatabase, private _sharedService: LoadingService, private afAuth: AngularFireAuth) {
        _sharedService.changeEmitted$.subscribe(
            value => {
                this.isAppLoading = value;
            });
        this.afAuth.auth.onAuthStateChanged(user => {
            if (user) {
                if (user.emailVerified) {
                    this.db.object('/users/' + user.uid, {preserveSnapshot: false}).take(1).subscribe((snapshot) => {
                        if (!snapshot.status) {
                            snapshot.status = 1;
                            this.db.object('users/' + snapshot.$key).update(snapshot).then(() => {
                                // update user successfully
                                console.log('Update verified status successfully');
                            }).catch((error) => {
                                console.log('Update verified status failed');
                                console.log(error);
                            });
                        }
                    });

                }
            }
        });
    }
}
