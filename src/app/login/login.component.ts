import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    user = {email: 'Hoangdd87@gmail.com', password: '123456'};

    constructor(private _loadingService: LoadingService, private afAuth: AngularFireAuth, private router: Router) {

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
            console.log('error:' + error.code);
            switch (error.code) {
                case `auth/wrong-password`: {
                    alert('Sai mật khẩu, bạn hãy kiểm tra lại')
                    break;
                }
                case `auth/user-not-found`: {
                    alert('Tài khoản không tồn tại');
                    break;
                }
                default: {
                    alert('Email hoặc mật khẩu không đúng bạn hãy thử lại');
                    break;
                }
            }


        });
    }
}
