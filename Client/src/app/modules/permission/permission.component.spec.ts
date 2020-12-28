import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PermissionComponent} from './permission.component';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {PermissionMockApiService} from '../../mocks/permission.mockapi.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {PageResponse} from '../../shared/models/page-response.model';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {PermissionUpdateInput} from '../../shared/components/permission/permission-update.input';

describe('PermissionComponent', () => {
    let component: PermissionComponent;
    let fixture: ComponentFixture<PermissionComponent>;
    let permissionApiService: PermissionApiService;

    let permissionList: PermissionBase[] = [
        {id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit'},
        {id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete'},
        {id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update'},
        {id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create'},
        {id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin'},
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PermissionComponent],
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
                PermissionApiService,
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}}
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(PermissionComponent);
                component = fixture.componentInstance;
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        permissionApiService = fixture.debugElement.injector.get(PermissionApiService);
        const mockPaginatedPermissions: PageResponse<PermissionBase> = {
            content: permissionList,
            size: 5,
            totalElements: 5,
            totalPages: 1,
            number: 0
        };
        spyOn(permissionApiService, 'get').and.returnValue(of(mockPaginatedPermissions));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 5 permissions', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.data.length).toEqual(5);
    }));

    it('should have equal permissions', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.data).toEqual(permissionList);
    }));
});
