import {Component, Input, Output} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {SharedService} from './services/shared-service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    @Input() isShowLoading = false;

    constructor(private _sharedService: SharedService) {
        _sharedService.changeEmitted$.subscribe(
            text => {
                this.toggleLoading();
                console.log(text);
            });
    }

    title = 'Olympic Tin học văn phòng';

    toggleLoading(): void {
        this.isShowLoading = true;
    }
}
