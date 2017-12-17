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
import {FinalUser} from '../model/FinalUser';

@Component({
    selector: 'app-finaluserslist',
    templateUrl: 'finaluserslist.component.html',
})
export class FinalUsersListComponent implements OnInit {
    finalUsers: FinalUser[] = [];
    userFilter: any = {searchKey: ''};
    isAdmin = false;

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService,
                private afAuth: AngularFireAuth, private dialogService: DialogService,
                private router: Router, private excelService: ExcelService) {
    }

    ngOnInit(): void {
        this._loadingService.emitChange(true);
        this.db.list('/final', {preserveSnapshot: false}).subscribe((snapshots) => {
            this.finalUsers = [];
            snapshots.forEach(snapshot => {
                this.finalUsers.push(new FinalUser(snapshot));

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
        this.excelService.exportAsExcelFile(this.finalUsers, 'persons');
    }

}

