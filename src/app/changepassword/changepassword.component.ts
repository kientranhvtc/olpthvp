import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';
import {ConfirmComponent} from '../confirm/confirm.component';
@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html',
})
export class ChangePasswordComponent implements OnInit {
    firebaseUser: firebase.User;
    myEmail: string;
    oldPassword = '';
    newPassword1 = '';
    newPassword2 = '';

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.firebaseUser = user;
            if (user) {
                // there is an user login
                this.myEmail = user.email;
                if (!user.emailVerified) {
                    const dialog = this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Lỗi',
                        message: `Email này chưa xác nhận. Bạn không thể yêu cầu đổi mật khâủ được`
                    }).subscribe(() => {
                        // Navigate to userslist after show notification to user
                        this.router.navigate(['/userinfo']);
                    });

                }

            } else {
                // there is no user login
                this.myEmail = '';
                this.router.navigate(['/login', {continueUrl: 'changepassword'}]);
            }
        });
    }

    onSubmit(): void {
        const newPassword = (this.newPassword1 === this.newPassword2) ? this.newPassword1 : '';
        if (!newPassword) {
            alert('Mật khẩu mới và nhắc lại không khớp với nhau');
            return;
        }

        this._loadingService.emitChange(true);
        this.afAuth.auth.signInWithEmailAndPassword(this.myEmail, this.oldPassword).then((currentUser) => {
            // Sign in again successfully

            currentUser.updatePassword(newPassword).then(() => {
                // Update Password successfully
                this._loadingService.emitChange(false);
                const dialog = this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Đổi mật khẩu thành công',
                    message: `Bạn đã đổi mật khẩu thành công`
                }).subscribe(() => {
                    // Navigate to userslist after show notification to user
                    this.router.navigate(['/userinfo']);
                });
            }).catch((error) => {
                this._loadingService.emitChange(false);
                alert('Có lỗi xảy ra trong quá trình đổi mật khẩu, bạn hãy thử lại sau');

            });
        }).catch((error: firebase.FirebaseError) => {
            // sign in failed
            this._loadingService.emitChange(false);
            switch (error.code) {
                case `auth/wrong-password`: {
                    alert('Mật khẩu hiện tại không đúng, bạn hãy thử lại');
                    break;
                }
                default: {
                    alert('Đã có lỗi xảy ra, bạn hãy thử lại sau');
                    break;
                }
            }

        });


    }

}
