/**
 * Created by hoangdaoduc on 9/23/17.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Room} from '../model/room.model';
import {Section} from '../model/section.model';
import {forEach} from '@angular/router/src/utils/collection';
import {SharedService} from '../services/shared-service';
@Component({
    selector: 'app-database',
    templateUrl: 'database.component.html',
})
export class DatabaseComponent {
    roomsRef: FirebaseListObservable<any[]>;
    rooms: Room[];
    sectionsRef: FirebaseListObservable<Section[]>;
    sections: Section[];


    constructor(private db: AngularFireDatabase, private _sharedService: SharedService) {
        this.roomsRef = this.db.list('/rooms', {preserveSnapshot: false});
        this.roomsRef.subscribe(snapshots => {
            this.rooms = snapshots;
        });
        this.sectionsRef = this.db.list('/sections');
        this.sectionsRef.subscribe(snapshots => {
            this.sections = snapshots;
        });
    }

    initRooms(): void {

        this.roomsRef.remove()
            .then(() => this.roomsRef.push(new Room('106 PM', 40)))
            .then(() => this.roomsRef.push(new Room('106 TV', 40)))
            .then(() => this.roomsRef.push(new Room('206 PM', 50)))
            .then(() => this.roomsRef.push(new Room('206 TV', 50)))
            .then(() => this.roomsRef.push(new Room('204', 50))).then(() => console.log('Created roomsRef successful'));
    }

    initSections(): void {

        this.sectionsRef.remove()
            .then(() => this.sectionsRef.push(new Section('Ca 1: 16h30', 0))
                .then(() => this.sectionsRef.push(new Section('Ca 2: 17h15', 0)))
                .then(() => this.sectionsRef.push(new Section('Ca 3: 18h00', 0)))
                .then(() => this.sectionsRef.push(new Section('Ca 4: 18h45', 0)))
                .then(() => this.sectionsRef.push(new Section('Ca 5: 19h30', 0)))
                .then(() => console.log('Created sectiond successful')));
    }

    saveRooms(): void {
        // this.roomsRef.update(this.roomsRef.val());
        // console.log(this.roomsRef.key);
        alert('he2');
        this._sharedService.emitChange('Data from child');
    }

}

