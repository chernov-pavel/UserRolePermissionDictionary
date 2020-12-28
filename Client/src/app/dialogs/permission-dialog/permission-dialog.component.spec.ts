import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDialogComponent } from './permission-dialog.component';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {RoleMockApiService} from '../../mocks/role.mockapi.service';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {PermissionMockApiService} from '../../mocks/permission.mockapi.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('PermissionDialogComponent', () => {
  let component: PermissionDialogComponent;
  let fixture: ComponentFixture<PermissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ PermissionDialogComponent ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MaterialModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule
        ],
        providers: [
          { provide: PermissionApiService, useClass: PermissionMockApiService },
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
