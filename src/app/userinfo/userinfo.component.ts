import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
@Component({
    selector: 'app-register',
    templateUrl: 'userinfo.component.html',
})
export class UserInfoComponent implements OnInit {
    user: User = new User('hoangdd87@gmail.com', 'Đào Đức Hoàng', '43/41.01', '', '0989596889', '', '-Kuxe7mus8V03jlLiIuv');

    ngOnInit(): void {
    }

}
