/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent {
    constructor(private router: Router) {
    }

    gotoRegister(): void {
        this.router.navigate(['register']);
    }

    gotoUsersList(): void {
        this.router.navigate(['userslist']);
    }
}
