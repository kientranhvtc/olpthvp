/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component, OnInit} from '@angular/core';
import {Section} from '../model/section.model';
import {User} from '../model/user.model';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
    sections: Section[] = [new Section('Ca 1', 15), new Section('Ca 2', 30)];
    user: User = new User('hoangdd87@gmail.com', 'Đào Đức Hoàng',
        'K43/41.01', 'K43/41.01LT', '0989596889', 'key1', 'key1');

    constructor() {
        this.sections[0].$key = 'key0';
        this.sections[1].$key = 'key1';
    }


    ngOnInit(): void {
    }

    checkEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}

