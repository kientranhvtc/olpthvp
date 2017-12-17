import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';
import {Section} from '../model/section.model';
import {ConfirmComponent} from '../confirm/confirm.component';
@Component({
    selector: 'app-userinfo',
    templateUrl: 'userinfo.component.html',
})
export class UserInfoComponent implements OnInit {
    firebaseUser: firebase.User;
    sections: Section[] = [];
    user: User;
    verifiedText: string;

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.firebaseUser = user;
            // console.log(user);

            if (user) {
                this.verifiedText = user.emailVerified ? '' : '(Email này chưa được xác nhận, hãy kiểm tra hòm thư và xác nhận)';
                // there is an user login
                this.db.object('finalUsers/' + user.uid, {preserveSnapshot: false}).subscribe((snapshot) => {
                    this.user = snapshot;
                    // console.log(this.user);
                });
                this.db.list('/sections', {preserveSnapshot: false}).subscribe((snapshots) => {
                    this.sections = snapshots;
                });
            } else {
                // there is no user login
                this.router.navigate(['/login', {continueUrl: 'userinfo'}]);
            }
        });


    }

    onSubmit(): void {
        this._loadingService.emitChange(true);
        this.db.object('finalUsers/' + this.firebaseUser.uid).update(this.user).then(() => {
            // update user successfully
            this._loadingService.emitChange(false);
            const dialog = this.dialogService.addDialog(ConfirmComponent, {
                title: 'Sửa thông tin thành công',
                message: `Bạn đã sửa thông tin thành công`
            }).subscribe(() => {

            });
        }).catch((error) => {
            // update user failed
            this._loadingService.emitChange(false);
            alert('Đã có lỗi xảy ra, hãy thử lại sau');
        });

    }

    sendEmail(): void {
        if (this.firebaseUser) {
            this.afAuth.auth.languageCode = 'vi';
            this.firebaseUser.sendEmailVerification().then(() => {
                const dialog = this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Gửi email xác nhận ',
                    message: `Một email đã gửi tới email này, bạn hãy làm theo hướng dẫn để được xác nhận`
                }).subscribe(() => {

                });
            }).catch((error) => {
                alert('Đã có lỗi xảy ra, hãy thử lại sau');
            });
        }
    }


}

