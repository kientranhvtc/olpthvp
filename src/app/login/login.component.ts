import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {ConfirmComponent} from '../confirm/confirm.component';
import {DialogService} from 'ng2-bootstrap-modal';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    user = {email: '', password: ''};

    constructor(private _loadingService: LoadingService, private afAuth: AngularFireAuth, private router: Router, private dialogService: DialogService) {

    }

    ngOnInit(): void {

    }

    login(): void {
        this._loadingService.emitChange(true);
        this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
            this._loadingService.emitChange(false);
            this.router.navigate(['/userinfo']);
        }).catch((error: firebase.FirebaseError) => {
            this._loadingService.emitChange(false);
            let strCode = '';
            switch (error.code) {
                case `auth/wrong-password`: {
                    strCode = ('Sai mật khẩu, bạn hãy kiểm tra lại')
                    break;
                }
                case `auth/user-not-found`: {
                    strCode = ('Tài khoản không tồn tại');
                    break;
                }
                case `auth/network-request-failed`: {
                    strCode = ('Lỗi kết nối mạng');
                    break;
                }
                default: {
                    strCode = ('Email hoặc mật khẩu không đúng bạn hãy thử lại');
                    break;
                }
            }
            const dialog = this.dialogService.addDialog(ConfirmComponent, { title: 'Lỗi',
                message: strCode });


        });
    }
}
