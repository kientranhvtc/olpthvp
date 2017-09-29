import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';

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
        });
    }
}
