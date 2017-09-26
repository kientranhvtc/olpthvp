/**
 * Created by hoangdaoduc on 9/23/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Room} from '../model/room.model';
import {Section} from '../model/section.model';
import {LoadingService} from '../services/loading-service';
import {Subject} from 'rxjs/Subject';
@Component({
    selector: 'app-database',
    templateUrl: 'database.component.html',
})
export class DatabaseComponent implements OnInit {
    rooms: Room[];
    sections: Section[];

    constructor(private db: AngularFireDatabase, private _loadingService: LoadingService) {
    }

    ngOnInit() {
        const itemNeeded = 2;
        const subject: Subject<number> = new Subject<number>();
        let count = 0;
        const t = subject.subscribe(() => {
            count++;
            if (count === itemNeeded) {
                this._loadingService.emitChange(false);
                t.unsubscribe();
                subject.complete();
            }

        });

        this._loadingService.emitChange(true);
        this.db.list('/rooms', {preserveSnapshot: false}).subscribe(snapshots => {
            this.rooms = snapshots;
            subject.next(1);
        });
        this.db.list('/sections', {preserveSnapshot: false}).subscribe(snapshots => {
            this.sections = snapshots;
            subject.next(2);

        });
    }

    initRooms(): void {
        const roomsObser = this.db.list('/rooms');
        roomsObser.remove()
            .then(() => roomsObser.push(new Room('106 PM', 40)))
            .then(() => roomsObser.push(new Room('106 TV', 40)))
            .then(() => roomsObser.push(new Room('206 PM', 50)))
            .then(() => roomsObser.push(new Room('206 TV', 50)))
            .then(() => roomsObser.push(new Room('204', 50)))
            .then(() => console.log('Created roomsListObser successful'));
    }

    initSections(): void {
        const sectiosObser = this.db.list('/sections');
        sectiosObser.remove()
            .then(() => sectiosObser.push(new Section('Ca 1: 16h30', 0, 230))
                .then(() => sectiosObser.push(new Section('Ca 2: 17h15', 0, 230)))
                .then(() => sectiosObser.push(new Section('Ca 3: 18h00', 0, 230)))
                .then(() => sectiosObser.push(new Section('Ca 4: 18h45', 0, 230)))
                .then(() => sectiosObser.push(new Section('Ca 5: 19h30', 0, 230)))
                .then(() => console.log('Created sectiond successful')));
    }

    saveRooms(): void {
        this._loadingService.emitChange(true);
        const updateRoomsData = {};
        this.rooms.forEach((room) => {
            updateRoomsData[room.$key] = room;
        });
        this.db.object('/rooms').update(updateRoomsData).then(() => {
            this._loadingService.emitChange(false);
        });
    }

    saveSections(): void {
        this._loadingService.emitChange(true);
        const updateSectionsData = {};
        this.sections.forEach((section) => {
            updateSectionsData[section.$key] = section;
        });
        this.db.object('/sections').update(updateSectionsData).then(() => {
            this._loadingService.emitChange(false);
        });
    }
}

