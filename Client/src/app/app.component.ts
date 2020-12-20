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
                index: 0,
                label: 'Пользователи',
                link: './users'
            },
            {
                index: 1,
                label: 'Роли',
                link: './roles'
            },
            {
                index: 2,
                label: 'Права',
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
