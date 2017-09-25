import {Component, Input, Output} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {LoadingService} from './services/loading-service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    @Input() isAppLoading = false;

    constructor(private _sharedService: LoadingService) {
        _sharedService.changeEmitted$.subscribe(
            value => {
                this.isAppLoading = value;
            });
    }
}
