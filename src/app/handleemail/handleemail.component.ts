import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../confirm/confirm.component';

function getParameterByName(name): any {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ''));
}
@Component({
    selector: 'app-handleemail',
    templateUrl: 'handleemail.component.html',
})
export class HandleEmailComponent implements OnInit {
    mode = '';
    actionCode: string;
    apiKey: string;
    continueUrl: string;
    hidden = true;
    success = null;
    user = {email: '', newPassword1: '', newPassword2: ''};

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {

        // TODO: Implement getParameterByName()
        this.success = null;
        // Get the action to complete.
        this.mode = getParameterByName('mode');
        // Get the one-time code from the query parameter.
        this.actionCode = getParameterByName('oobCode');
        // (Optional) Get the API key from the query parameter.
        this.apiKey = getParameterByName('apiKey');
        // (Optional) Get the continue URL from the query parameter if available.
        this.continueUrl = getParameterByName('continueUrl');

        // Handle the user management action.
        switch (this.mode) {
            case 'resetPassword':
                this._loadingService.emitChange(true);
                this.afAuth.auth.verifyPasswordResetCode(this.actionCode).then((email) => {
                    this._loadingService.emitChange(false);
                    this.user.email = email;
                    this.hidden = false;
                }).catch((error) => {
                    // Invalid or expired action code. Ask user to try to reset the password again.
                    this._loadingService.emitChange(false);
                    const dialog = this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Yêu cầu lấy lại mật khẩu thất bại',
                        message: `Việc yêu cầu lấy lại mật khẩu đã có thất bại.
                         Có thể do email xác nhận này đã hết hiệu lực, bạn hãy thử lại sau`
                    }).subscribe(() => {
                    });
                });
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                // handleRecoverEmail(auth, actionCode);
                break;
            case 'verifyEmail':
                this._loadingService.emitChange(true);
                this.afAuth.auth.applyActionCode(this.actionCode).then((resp) => {
                    this._loadingService.emitChange(false);
                    this.hidden = false;
                    this.success = true;
                    const currentUser = this.afAuth.auth.currentUser;
                    if (currentUser) {
                        currentUser.reload().then(() => {
                            if (currentUser.emailVerified) {
                                this.db.object('finalUsers/' + currentUser.uid, {preserveSnapshot: false}).take(1).subscribe((snapshot) => {
                                    if (!snapshot.status) {
                                        snapshot.status = 1;
                                        this.db.object('finalUsers/' + snapshot.$key).update(snapshot).then(() => {
                                            // update user successfully
                                            console.log('Update verified status successfully');
                                        }).catch((error) => {
                                            console.log('Update verified status failed');
                                            console.log(error);
                                        });
                                    }
                                });

                            }
                        });

                    }
                    // this.afAuth.auth.signOut();
                    // TODO: Display a confirmation message to the user.
                    // You could also provide the user with a link back to the app.
                }).catch((error) => {
                    this._loadingService.emitChange(false);
                    this.success = false;
                });

                break;
            default:
            // Error: invalid mode.
        }
    }

    gotoPage(path: string): void {
        this.router.navigate([path]);
    }

    saveNewPassWord(): void {
        if (this.user.newPassword1 !== this.user.newPassword2) {
            const dialog = this.dialogService.addDialog(ConfirmComponent, {
                title: 'Đổi mật khâủ thất bại',
                message: `Mật khẩu mới và nhắc lại không khớp nhau`
            }).subscribe(() => {
            });
            return;
        }
        const newPassword = this.user.newPassword1;
        this.afAuth.auth.confirmPasswordReset(this.actionCode, newPassword).then((resp) => {
            const dialog = this.dialogService.addDialog(ConfirmComponent, {
                title: 'Đổi mật khâủ thành công',
                message: `Bạn đã đổi mật khẩu thành công. Bạn có thể login vào tài khoản theo mật khẩu mới`
            }).subscribe(() => {
                this.gotoPage('login');
            });
        }).catch((error) => {
            const dialog = this.dialogService.addDialog(ConfirmComponent, {
                title: 'Đổi mật khâủ thất bại',
                message: `Bạn đã đổi mật khẩu thất bại. Hãy kiểm tra lại mật khẩu phải đủ 6 kí tự`
            }).subscribe(() => {
            });
        });
    }


}
