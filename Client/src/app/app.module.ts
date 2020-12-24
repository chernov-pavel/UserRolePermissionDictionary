import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './modules/user/user.component';
import { RoleComponent } from './modules/role/role.component';
import { PermissionComponent } from './modules/permission/permission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {PermissionApiService} from './core/services/permission/permission.api.service';
import {PermissionService} from './core/services/permission/permission.service';
import { HttpClientModule } from '@angular/common/http';
import { PermissionDialogComponent } from './dialogs/permission-dialog/permission-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';
import { RoleDialogComponent } from './dialogs/role-dialog/role-dialog.component';
import {RoleApiService} from './core/services/role/role.api.service';
import {UserApiService} from './core/services/user/user.api.service';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoleComponent,
    PermissionComponent,
    PermissionDialogComponent,
    YesNoDialogComponent,
    RoleDialogComponent,
    UserDialogComponent
  ],
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
      PermissionApiService,
      RoleApiService,
      UserApiService,
      PermissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
