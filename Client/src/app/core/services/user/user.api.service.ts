import { Injectable } from '@angular/core';
import {BaseApiService} from '../base/base.api.service';
import {UserBase} from '../../../shared/components/user/user-base.model';
import {UserCreateInput} from '../../../shared/components/user/user-create-input.model';
import {UserUpdateInput} from '../../../shared/components/user/user-update-input.model';
import {PageResponse} from '../../../shared/models/page-response.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserApiService extends BaseApiService<UserBase, PageResponse<UserBase>, UserCreateInput, UserUpdateInput>{
    protected controllerName: string = 'users';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    checkUsername(roleName: string): Observable<boolean> {
        const url = `${this.apiUrl}${this.controllerName}/checkusername?username=${roleName}`;
        return this.httpClient.get<boolean>(url);
    }

}
