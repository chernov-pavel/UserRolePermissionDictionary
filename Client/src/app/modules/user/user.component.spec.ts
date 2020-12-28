import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserApiService} from '../../core/services/user/user.api.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserBase} from '../../shared/components/user/user-base.model';
import {PageResponse} from '../../shared/models/page-response.model';
import {of} from 'rxjs';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let userApiService: UserApiService;
    let userList: UserBase[] = [
        {
            id: '2215906b-834a-4fce-8c59-b967bee20001',
            username: 'egor',
            password: '123456',
            firstname: 'egor',
            lastname: 'patrik',
            email: 'p@mail.ru',
            role: {
                id: '2215906b-834a-4fce-8c59-b967bee10003',
                name: 'dbModerator',
                permissions: [
                    { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
                ]
            }
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee20002',
            username: 'alakin',
            password: '123456',
            firstname: 'igor',
            lastname: 'alakin',
            email: 'igor@mail.ru',
            role: {
                id: '2215906b-834a-4fce-8c59-b967bee10004',
                name: 'guest',
                permissions: []
            },
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee20003',
            username: 'papatki',
            password: '1234',
            firstname: 'vlad',
            lastname: 'papatki',
            email: 'papatki@mail.ru',
            role: {
                id: '2215906b-834a-4fce-8c59-b967bee10005',
                name: 'sa',
                permissions: [
                    { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin' },
                ]
            },
        }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserComponent],
            imports: [
                BrowserModule,
                AppRoutingModule,
                BrowserAnimationsModule,
                MaterialModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [
                UserApiService,
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}}
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(UserComponent);
                component = fixture.componentInstance;
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        userApiService = fixture.debugElement.injector.get(UserApiService);
        const mockPaginatedRoles: PageResponse<UserBase> = {
            content: userList,
            size: 3,
            totalElements: 3,
            totalPages: 1,
            number: 0
        };
        spyOn(userApiService, 'get').and.returnValue(of(mockPaginatedRoles));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 3 users', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.data.length).toEqual(3);
    }));

    it('should have equal users', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.data).toEqual(userList);
    }));
});
