import { Injectable } from '@angular/core';
import {BaseApiService} from '../base/base.api.service';
import {PageResponse} from '../../../shared/models/page-response.model';
import {RoleBase} from '../../../shared/components/role/role-base.model';
import {RoleCreateInput} from '../../../shared/components/role/role-create-input.model';
import {RoleUpdateInput} from '../../../shared/components/role/role-update-input.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RoleApiService extends BaseApiService<RoleBase, PageResponse<RoleBase>, RoleCreateInput, RoleUpdateInput>{
    protected controllerName: string = 'roles';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    checkRoleName(roleName: string): Observable<boolean> {
        const url = `${this.apiUrl}${this.controllerName}/checkname?name=${roleName}`;
        return this.httpClient.get<boolean>(url);
    }
}
