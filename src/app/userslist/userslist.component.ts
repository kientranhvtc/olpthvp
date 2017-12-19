/**
 * Created by hoangdaoduc on 9/17/17.
 */
import {Component, OnInit, Pipe} from '@angular/core';
import {User} from '../model/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingService} from '../services/loading-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router} from '@angular/router';
import {Section} from '../model/section.model';
import {forEach} from '@angular/router/src/utils/collection';
import {ExcelService} from '../services/excel.service';

@Component({
    selector: 'app-userslist',
    templateUrl: 'userslist.component.html',
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    sectionsMap: { [key: string]: Section } = {};
    userFilter: any = {searchKey: ''};
    isAdmin = false;

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService,
                private excelService: ExcelService) {
    }

    ngOnInit(): void {
        this._loadingService.emitChange(true);
        this.db.list('/sections', {preserveSnapshot: false}).subscribe((snapshots) => {
            snapshots.forEach(snapShot => {
                this.sectionsMap[snapShot.$key] = snapShot;
            });
        });
        this.db.list('/users', {preserveSnapshot: false}).subscribe((snapshots) => {
            this.users = [];
            snapshots.forEach(snapshot => {
                this.users.push(new User(snapshot));

            });
            // this.finalUsers.reverse();
            // console.log(this.finalUsers);
            this.users.sort((user1: User, user2: User) => {
                if (parseInt(user1.id, 10) > parseInt(user2.id, 10)) {
                    return 1;
                } else if (parseInt(user1.id, 10) < parseInt(user2.id, 10)) {
                    return -1;
                } else {
                    return 0;
                }
            });
            this._loadingService.emitChange(false);

        });
        this.afAuth.auth.onAuthStateChanged(user => {
                if (user) {
                    // there is an user login
                    this.db.object('/users/' + user.uid + '/role').subscribe((snapShot) => {
                        if (snapShot.$value === 'admin') {
                            this.isAdmin = true;
                        } else {
                            this.isAdmin = false;
                        }
                        console.log(snapShot);
                    });
                } else {
                    // there is no user login
                }
            }
        );
    }

    exportToExcel(event) {
        this.excelService.exportAsExcelFile(this.users, 'persons');
    }

}

