import { Injectable } from '@angular/core';
import {PageRequest} from '../shared/models/page-request.model';
import {Observable, of} from 'rxjs';
import {PermissionBase} from '../shared/components/permission/permission.base.model';
import {PageResponse} from '../shared/models/page-response.model';
import {PermissionCreateInput} from '../shared/components/permission/permission-create-input.model';
import {ResponseError} from '../shared/models/response-error.model';
import {PermissionUpdateInput} from '../shared/components/permission/permission-update.input';
import {RoleBase} from '../shared/components/role/role-base.model';
import {RoleCreateInput} from '../shared/components/role/role-create-input.model';
import {RoleUpdateInput} from '../shared/components/role/role-update-input.model';

@Injectable()
export class RoleMockApiService{
    controllerName = 'roles'
    permissionList: PermissionBase[] = [
        { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
        { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
        { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
        { id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create' },
        { id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin' },
    ];
    resultList: RoleBase[] = [
        {
            id: '2215906b-834a-4fce-8c59-b967bee10001',
            name: 'dbAdmin',
            permissions: [
                { id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create' },
                { id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin' },
            ]
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10002',
            name: 'dbUser',
            permissions: []
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10003',
            name: 'dbModerator',
            permissions: [
                { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
                { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
                { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
            ]
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10004',
            name: 'guest',
            permissions: []
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee10005',
            name: 'sa',
            permissions: [
                { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
                { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
                { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
                { id: '2215906b-834a-4fce-8c59-b967bee00004', name: 'create' },
                { id: '2215906b-834a-4fce-8c59-b967bee00005', name: 'admin' },
            ]
        },
    ];

    getAll(): Observable<RoleBase[]> {
        return of(this.resultList);
    }

    get(pageRequest: PageRequest): Observable<PageResponse<RoleBase>> {
        const resultContent = this.resultList.slice(0, pageRequest.size - 1);
        return of({
            content: resultContent,
            size: pageRequest.size,
            totalElements: resultContent.length,
            totalPages: this.resultList.length / pageRequest.size + 1,
            number: pageRequest.page
        });
    }


    getById(id: string): Observable<RoleBase | ResponseError> {
        const item = this.resultList.find(o => o.id === id);
        if (item) {
            return of(item);
        }
        return of({ name: `Permission with id=${id} not found.`} as ResponseError)
    }

    create(createModel: RoleCreateInput): Observable<RoleBase> {
        return of({
            id: '2215906b-834a-4fce-8c59-b967bee10006',
            name: createModel.name,
            permissions: this.permissionList.filter(o => createModel.permissionIds.some(t => t === o.id))
        });
    }

    deleteById(id: string): Observable<any> {
        const item = this.resultList.find(o => o.id === id);
        if (!item) {
            return of({ name: `Rolel
             with id=${id} not found.`} as ResponseError)
        }
        return of();
    }

    update(id: string, newModel: RoleUpdateInput): Observable<RoleBase | ResponseError> {
        const item = this.resultList.find(o => o.id === id);
        if (!item) {
            return of({ name: `Permission with id=${id} not found.`} as ResponseError)
        }
        item.name = newModel.name;
        item.permissions = this.permissionList.filter(o => newModel.permissionIds.some(t => t === o.id));
        return of(item);
    }
    checkRoleName(roleName: string): Observable<boolean> {
        const item = this.resultList.find(o => o.name === roleName);
        if (!item) {
            return of(true)
        }
        return of(false);
    }
}
