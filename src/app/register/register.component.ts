/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component, OnInit} from '@angular/core';
import {Section} from '../model/section.model';
import {User} from '../model/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../confirm/confirm.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
    sections: Section[] = [];
    user: User = new User('', '', '', '', '', '', '');

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }


    ngOnInit(): void {
        this.db.list('/sections', {preserveSnapshot: false}).subscribe((snapshots) => {
            this.sections = snapshots;
        });
    }

    onSubmit() {
        /* Tìm xem trong users đã có email vừa gửi không. Nếu có thì báo là tài khoản này đã đã đăng ký rồi*/
        this._loadingService.emitChange(true);
        const createAuth = this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, '123456');
        createAuth.then(user => {
            // Create an auth account successfully
            const usersObject = this.db.object('/users/' + user.uid);
            usersObject.set(this.user).then(() => {
                // Store in the database successfully
                this._loadingService.emitChange(false);
                const actionCodeSettings = {};
                this.afAuth.auth.languageCode = 'vi';
                this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
                    // Send Email verification successfully
                    const dialog = this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Đăng ký thành công',
                        message: `Bạn đã đăng ký thành công. Một email đã được gửi tới ` + this.user.email + `
                    . Bạn hãy kiểm tra hòm thư và xác nhận theo hướng dẫn`
                    }).subscribe(() => {
                        // Navigate to userslist after show notification to user
                        this.router.navigate(['/userslist']);

                    });
                }).catch((error) => {
                    // Send email verification failed
                    this._loadingService.emitChange(false);
                    alert('Có lỗi xảy ra trong quá trình gửi email xác nhận');

                });
            }).catch(() => {
                // Store data in the database failed
                this._loadingService.emitChange(false);
                alert('Bạn đã tạo tài khoản email thành công, nhưng có lỗi trong việc lưu thông tin dự thi. ' +
                    'Hãy kiểm tra hòm thư để có thêm thông tin');
            });
        }).catch((error: firebase.FirebaseError) => {
            // Create user account failed
            console.log(error.code);
            switch (error.code) {
                case `auth/email-already-in-use`: {
                    alert('Email ' + this.user.email + ' đã đăng ký dự thi trước đó, hãy kiểm tra lại email');
                    break;
                }
                case `auth/network-request-failed`: {
                    alert('Lỗi kết nối mạng bạn hãy thử lại sau');
                    break;
                }
                default: {
                    alert('Email hoặc mật khẩu không đúng bạn hãy thử lại');
                    break;
                }
            }
        });
    }
    showConfirm() {
        const disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((isConfirmed) => {
                // We get dialog result
                if (isConfirmed) {
                    alert('accepted');
                } else {
                    alert('declined');
                }
            });
        // We can close dialog calling disposable.unsubscribe();
        // If dialog was not closed manually close it by timeout
        /*setTimeout(() => {
         disposable.unsubscribe();
         }, 10000);*/
    }

}

