import { Injectable } from '@angular/core';
import {PageRequest} from '../shared/models/page-request.model';
import {Observable, of} from 'rxjs';
import {PermissionBase} from '../shared/components/permission/permission.base.model';
import {PageResponse} from '../shared/models/page-response.model';
import {PermissionCreateInput} from '../shared/components/permission/permission-create-input.model';
import {ResponseError} from '../shared/models/response-error.model';
import {PermissionUpdateInput} from '../shared/components/permission/permission-update.input';

@Injectable()
export class PermissionMockApiService{
    controllerName = 'permissions'
    resultList: PermissionBase[] = [
        { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
        { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
        { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
        { id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create' },
        { id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin' },
    ];

    getAll(): Observable<PermissionBase[]> {
        return of(this.resultList);
    }

    get(pageRequest: PageRequest): Observable<PageResponse<PermissionBase>> {
        const resultContent = this.resultList.slice(0, pageRequest.size - 1);
        return of({
            content: resultContent,
            size: pageRequest.size,
            totalElements: resultContent.length,
            totalPages: this.resultList.length / pageRequest.size + 1,
            number: pageRequest.page
        });
    }


    getById(id: string): Observable<PermissionBase | ResponseError> {
        const item = this.resultList.find(o => o.id === id);
        if (item) {
            return of(item);
        }
        return of({ name: `Permission with id=${id} not found.`} as ResponseError)
    }

    create(createModel: PermissionCreateInput): Observable<PermissionBase> {
        return of({ id: '2215906b-834a-4fce-8c59-b967bee00006', name: createModel.name });
    }

    deleteById(id: string): Observable<any> {
        const item = this.resultList.find(o => o.id === id);
        if (!item) {
            return of({ name: `Permission with id=${id} not found.`} as ResponseError)
        }
        return of();
    }

    update(id: string, newModel: PermissionUpdateInput): Observable<PermissionBase | ResponseError> {
        const item = this.resultList.find(o => o.id === id);
        if (!item) {
            return of({ name: `Permission with id=${id} not found.`} as ResponseError)
        }
        item.name = newModel.name;
        return of(item);
    }
    checkPermissionName(permissionName: string): Observable<boolean> {
        const item = this.resultList.find(o => o.name === permissionName);
        if (!item) {
            return of(true)
        }
        return of(false);
    }
}
