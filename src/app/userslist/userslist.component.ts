/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';
import {Section} from '../model/section.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-userslist',
    templateUrl: 'userslist.component.html',
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    sectionsMap: { [key: string]: Section } = {};
    userFilter: any = {searchKey: ''};

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService, private router: Router) {
    }

    ngOnInit(): void {
        this.db.list('/sections', {preserveSnapshot: false}).subscribe((snapshots) => {
            snapshots.forEach(snapShot => {
                this.sectionsMap[snapShot.$key] = snapShot;
            });
            // this.sections = snapshots;
            console.log(this.sectionsMap);
        });
        this.db.list('/users', {preserveSnapshot: false}).subscribe((snapshots) => {
            this.users = [];
            snapshots.forEach(snapshot => {
                this.users.push(new User(snapshot.email, snapshot.fullName, snapshot.lopNc,
                    snapshot.lopTc, snapshot.phoneNumber, snapshot.roomKey, snapshot.sectionKey));

            });
            console.log(this.users);
        });
    }

}

