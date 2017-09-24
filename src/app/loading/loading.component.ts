/**
 * Created by hoangdaoduc on 9/24/17.
 */

import {Component, Input} from '@angular/core';
@Component({
    selector: 'app-loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent {
    @Input() isLoading = false;
}
