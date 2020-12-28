import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DictionaryTab} from './shared/models/dictionary-tab.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    tabs: DictionaryTab[];
    activeLinkIndex = -1;

    constructor(private router: Router) {
        this.tabs = [
            {
                id: 'usertab',
                index: 0,
                label: 'Users',
                link: './users'
            },
            {
                id: 'roletab',
                index: 1,
                label: 'Roles',
                link: './roles'
            },
            {
                id: 'permissiontab',
                index: 2,
                label: 'Permissions',
                link: './permissions'
            }
        ];
    }

    ngOnInit(): void {
        this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.tabs.indexOf(this.tabs.find(tab => tab.link === '.' + this.router.url));
        });
    }
}
