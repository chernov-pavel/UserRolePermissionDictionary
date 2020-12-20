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
import {FormsModule} from '@angular/forms';
import { YesNoDialogComponent } from './shared/components/yes-no-dialog/yes-no-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoleComponent,
    PermissionComponent,
    PermissionDialogComponent,
    YesNoDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
      PermissionApiService,
      PermissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
