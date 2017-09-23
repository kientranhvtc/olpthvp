/**
 * Created by hoangdaoduc on 9/23/17.
 */
import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Room} from '../model/room.model';
import {Section} from '../model/section.model';
import {forEach} from '@angular/router/src/utils/collection';
@Component({
    selector: 'app-database',
    templateUrl: 'database.component.html',
})
export class DatabaseComponent {
    rooms: FirebaseListObservable<any[]>;
    myRooms: Room[];
    sections: FirebaseListObservable<Section[]>;
    room: Room;

    constructor(private db: AngularFireDatabase) {
        this.rooms = this.db.list('/rooms', {preserveSnapshot: false});
        this.sections = this.db.list('/sections');
        this.rooms
            .subscribe(snapshots => {
                this.myRooms = snapshots;
            })
        this.room = new Room('test', 50);
    }
    initRooms(): void {

        this.rooms.remove()
            .then(() => this.rooms.push(new Room('106 PM', 40)))
            .then(() => this.rooms.push(new Room('106 TV', 40)))
            .then(() => this.rooms.push(new Room('206 PM', 50)))
            .then(() => this.rooms.push(new Room('206 TV', 50)))
            .then(() => this.rooms.push(new Room('204', 50))).then(() => console.log('Created rooms successful'));
    }

    initSections(): void {

        this.sections.remove()
            .then(() => this.sections.push(new Section('Ca 1: 16h30', 0))
                .then(() => this.sections.push(new Section('Ca 2: 17h15', 0)))
                .then(() => this.sections.push(new Section('Ca 3: 18h00', 0)))
                .then(() => this.sections.push(new Section('Ca 4: 18h45', 0)))
                .then(() => this.sections.push(new Section('Ca 5: 19h30', 0)))
                .then(() => console.log('Created rooms successful')));
    }

    save(): void {
        // this.rooms.update(this.rooms.val());
        // console.log(this.rooms.key);
    }
}

