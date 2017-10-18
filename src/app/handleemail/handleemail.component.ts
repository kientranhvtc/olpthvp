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
    hidden = false;
    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {

        // TODO: Implement getParameterByName()

        // Get the action to complete.
        this.mode = getParameterByName('mode');
        console.log(this.mode);
        // Get the one-time code from the query parameter.
        this.actionCode = getParameterByName('oobCode');
        // (Optional) Get the API key from the query parameter.
        this.apiKey = getParameterByName('apiKey');
        // (Optional) Get the continue URL from the query parameter if available.
        this.continueUrl = getParameterByName('continueUrl');

        // Handle the user management action.
        switch (this.mode) {
            case 'resetPassword':
                // Display reset password handler and UI.
                // handleResetPassword(auth, actionCode, continueUrl);
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
                    // TODO: Display a confirmation message to the user.
                    // You could also provide the user with a link back to the app.

                }).catch((error) => {
                    this._loadingService.emitChange(false);
                    const dialog = this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Xác nhận thất bại',
                        message: `Việc xác nhận email đã có thất bại, Có thể do email xác nhận này đã hết hiệu lực, bạn hãy thử lại sau`
                    }).subscribe(() => {

                    });
                });

                break;
            default:
            // Error: invalid mode.
        }

    }

    gotoChangePassword(): void {
        this.router.navigate(['/changepassword']);
    }



}
