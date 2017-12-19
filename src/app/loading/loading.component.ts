/**
 * Created by hoangdaoduc on 9/24/17.
 */

import {Component, Input} from '@angular/core';
import {LoadingService} from '../services/loading-service';
@Component({
    selector: 'app-loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent {
    constructor(private _sharedService: LoadingService) {
        _sharedService.changeEmitted$.subscribe(
            value => {
                this.isLoading = value;
            });
    }

    @Input() isLoading = false;
}
