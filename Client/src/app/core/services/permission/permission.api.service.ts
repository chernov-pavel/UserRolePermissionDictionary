import { Injectable } from '@angular/core';
import {PermissionBase} from '../../../shared/components/permission/permission.base.model';
import {BaseApiService} from '../base/base.api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PermissionUpdateInput} from '../../../shared/components/permission/permission-update.input';
import {PageResponse} from '../../../shared/models/page-response.model';
import {PermissionCreateInput} from '../../../shared/components/permission/permission-create-input.model';

@Injectable()
export class PermissionApiService extends BaseApiService<PermissionBase, PageResponse<PermissionBase>, PermissionCreateInput, PermissionUpdateInput>{
    protected controllerName: string = 'permissions';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    checkPermissionName(permissionName: string): Observable<boolean> {
        const url = `${this.apiUrl}${this.controllerName}/checkname?permissionName=${permissionName}`;
        return this.httpClient.get<boolean>(url);
    }
}
