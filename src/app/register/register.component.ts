/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component, OnInit} from '@angular/core';
import {Section} from '../model/section.model';
import {User} from '../model/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
    sections: Section[] = [];
    user: User = new User('hoangdd87@gmail.com', 'Đào Đức Hoàng', '43/41.01', '', '0989596889', '', '-Kuxe7mus8V03jlLiIuv');

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService) {
    }


    ngOnInit(): void {
        this.db.list('/sections', {preserveSnapshot: false}).subscribe((snapshots) => {
            this.sections = snapshots;
        });
    }

    onSubmit() {
        console.log(this.user);
    }

}

