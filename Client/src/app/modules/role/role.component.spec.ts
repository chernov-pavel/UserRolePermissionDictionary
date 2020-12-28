import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {RoleComponent} from './role.component';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PageResponse} from '../../shared/models/page-response.model';
import {of} from 'rxjs';
import {RoleBase} from '../../shared/components/role/role-base.model';

describe('RoleComponent', () => {
    let component: RoleComponent;
    let fixture: ComponentFixture<RoleComponent>;
    let roleApiService: RoleApiService;
    let roleList: RoleBase[] = [
        {
            id: '2215906b-834a-4fce-8c59-b967bee10001',
            name: 'dbAdmin',
            permissions: [
                {id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create'},
                {id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin'},
            ]
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10002',
            name: 'dbUser',
            permissions: []
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10003',
            name: 'dbModerator',
            permissions: [
                {id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit'},
                {id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete'},
                {id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update'},
            ]
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10004',
            name: 'guest',
            permissions: []
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10005',
            name: 'sa',
            permissions: [
                {id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit'},
                {id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete'},
                {id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update'},
                {id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create'},
                {id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin'},
            ]
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RoleComponent],
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
                RoleApiService,
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}}
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(RoleComponent);
                component = fixture.componentInstance;
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        roleApiService = fixture.debugElement.injector.get(RoleApiService);
        const mockPaginatedRoles: PageResponse<RoleBase> = {
            content: roleList,
            size: 5,
            totalElements: 5,
            totalPages: 1,
            number: 0
        };
        spyOn(roleApiService, 'get').and.returnValue(of(mockPaginatedRoles));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 5 roles', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.data.length).toEqual(5);
    }));

    it('should have equal roles', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.data).toEqual(roleList);
    }));
});
