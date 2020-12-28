import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {UserComponent} from './modules/user/user.component';
import {RoleComponent} from './modules/role/role.component';
import {PermissionComponent} from './modules/permission/permission.component';
import {PermissionDialogComponent} from './dialogs/permission-dialog/permission-dialog.component';
import {YesNoDialogComponent} from './dialogs/yes-no-dialog/yes-no-dialog.component';
import {RoleDialogComponent} from './dialogs/role-dialog/role-dialog.component';
import {UserDialogComponent} from './dialogs/user-dialog/user-dialog.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PermissionApiService} from './core/services/permission/permission.api.service';
import {RoleApiService} from './core/services/role/role.api.service';
import {UserApiService} from './core/services/user/user.api.service';
import {RoleMockApiService} from './mocks/role.mockapi.service';
import {PermissionMockApiService} from './mocks/permission.mockapi.service';
import {UserMockApiService} from './mocks/user.mockapi.service';
import {APP_BASE_HREF} from '@angular/common';
import {By, ProtractorBy} from 'protractor';
import {DebugElement} from '@angular/core';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
