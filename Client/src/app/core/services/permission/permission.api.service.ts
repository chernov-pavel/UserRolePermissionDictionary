import { Injectable } from '@angular/core';
import {PermissionBaseModel} from '../../../shared/components/permission/permission-base.model';
import {BaseApiService} from '../base/base.api.service';
import {BaseEndpointUrls} from '../../../shared/models/base-endpoint-urls.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PermissionApiService extends BaseApiService<PermissionBaseModel>{
    protected controllerName: string = "permissions";
    protected baseEndpointUrls: BaseEndpointUrls = {
        getAllEndpointName: '',
        getByIdEndpointName: '/{id}',
        addEndpointName: '/add',
        deleteByIdEndpointName: '/',
        updateEndpointName: '/{id}/update'
    };

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    update(newModel: PermissionBaseModel): Observable<PermissionBaseModel> {
        const url = `${this.apiUrl}${this.controllerName}/${newModel.id}/update`;
        return this.httpClient.put<PermissionBaseModel>(url,{ name: newModel.name });
    }
}
