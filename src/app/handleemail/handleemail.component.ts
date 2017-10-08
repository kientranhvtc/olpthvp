import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
    selector: 'app-handleemail',
    templateUrl: 'handleemail.component.html',
})
export class HandleEmailComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }
}
