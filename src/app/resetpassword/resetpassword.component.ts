import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {ConfirmComponent} from '../confirm/confirm.component';
import {DialogService} from 'ng2-bootstrap-modal';

@Component({
    selector: 'app-resetpassword',
    templateUrl: 'resetpassword.component.html',
})
export class ResetPasswordComponent implements OnInit {
    user = {email: 'Hoangdd87@gmail.com'};

    constructor(private _loadingService: LoadingService, private afAuth: AngularFireAuth, private router: Router,
                private dialogService: DialogService) {

    }

    ngOnInit(): void {
        this.afAuth.auth.signOut().then(() => {
        });
    }

    resetPassword(): void {
        this._loadingService.emitChange(true);
        this.afAuth.auth.languageCode = 'vi';
        this.afAuth.auth.sendPasswordResetEmail(this.user.email).then(() => {
            // reset password successfully
            this._loadingService.emitChange(false);
            const dialog = this.dialogService.addDialog(ConfirmComponent, {
                title: 'Reset password',
                message: `Bạn đã yêu cầu lấy lại mật khẩu cho tài khoản ` + this.user.email + `
                    . Bạn hãy kiểm tra hòm thư và xác nhận theo hướng dẫn`
            }).subscribe(() => {
                this.router.navigate(['/login']);

            });
        }).catch((error: firebase.FirebaseError) => {
            // reset password failed
            this._loadingService.emitChange(false);
            console.log('error:' + error.code);
            switch (error.code) {
                case `auth/invalid-email`: {
                    alert('Email không hợp lệ. bạn hãy kiểm tra lại');
                    break;
                }
                case `auth/user-not-found`: {
                    alert('Tài khoản không tồn tại');
                    break;
                }
                default: {
                    alert('Đã có lỗi xảy ra, hãy thử lại sau');
                    break;
                }
            }

        });
    }
}

