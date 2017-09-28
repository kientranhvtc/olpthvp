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
    user: User = new User('hoangdd87@gmail.com', 'Đào Đức Hoàng', '43/41.01', '', '0989596889', '', '-Kuxe7mus8V03jlLiIuv');

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
            const usersObject = this.db.object('/users/' + user.uid);
            usersObject.set(this.user).then(() => {
                this._loadingService.emitChange(false);
                const actionCodeSettings = {};
                this.afAuth.auth.languageCode = 'vi';
                this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
                    const dialog = this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Đăng ký thành công',
                        message: `Bạn đã đăng ký thành công. Một email đã được gửi tới ` + this.user.email + `
                    . Bạn hãy kiểm tra hòm thư và xác nhận theo hướng dẫn`
                    }).subscribe(() => {
                        this.router.navigate(['/userslist']);

                    });
                }).catch(function (error) {
                });
            }).catch(() => {
                this._loadingService.emitChange(false);
                alert('Bạn đã tạo tài khoản email thành công, nhưng có lỗi trong việc lưu thông tin dự thi. ' +
                    'Hãy kiểm tra hòm thư để có thêm thông tin');
            });
        }).catch((error: firebase.FirebaseError) => {
                if (error.code === 'auth/email-already-in-use') {
                    this._loadingService.emitChange(false);
                    alert('Email ' + this.user.email + ' đã đăng ký dự thi trước đó, hãy kiểm tra lại email');
                }
            }
        );
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

