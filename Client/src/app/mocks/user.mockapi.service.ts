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
import {UserBase} from '../shared/components/user/user-base.model';
import {UserCreateInput} from '../shared/components/user/user-create-input.model';
import {UserUpdateInput} from '../shared/components/user/user-update-input.model';

@Injectable()
export class UserMockApiService{
    controllerName = 'users'
    roleList: RoleBase[] = [
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

    resultList: UserBase[] = [
        {
            id: '2215906b-834a-4fce-8c59-b967bee20001',
            username: 'egor',
            password: '123456',
            firstname: 'egor',
            lastname: 'patrik',
            email: 'p@mail.ru',
            role: {
                id: '2215906b-834a-4fce-8c59-b967bee10003',
                name: 'dbModerator',
                permissions: [
                    { id: '2215906b-834a-4fce-8c59-b967bee00001', name: 'edit' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00002', name: 'delete' },
                    { id: '2215906b-834a-4fce-8c59-b967bee00003', name: 'update' },
                ]
            }
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee20002',
            username: 'alakin',
            password: '123456',
            firstname: 'igor',
            lastname: 'alakin',
            email: 'igor@mail.ru',
            role: {
                id: '2215906b-834a-4fce-8c59-b967bee10004',
                name: 'guest',
                permissions: []
            },
        },
        {
            id: '2215906b-834a-4fce-8c59-b967bee20003',
            username: 'papatki',
            password: '1234',
            firstname: 'vlad',
            lastname: 'papatki',
            email: 'papatki@mail.ru',
            role: {
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
        }
    ]

    getAll(): Observable<UserBase[]> {
        return of(this.resultList);
    }

    get(pageRequest: PageRequest): Observable<PageResponse<UserBase>> {
        const resultContent = this.resultList.slice(0, pageRequest.size - 1);
        return of({
            content: resultContent,
            size: pageRequest.size,
            totalElements: resultContent.length,
            totalPages: this.resultList.length / pageRequest.size + 1,
            number: pageRequest.page
        });
    }


    getById(id: string): Observable<UserBase | ResponseError> {
        const item = this.resultList.find(o => o.id === id);
        if (item) {
            return of(item);
        }
        return of({ name: `Permission with id=${id} not found.`} as ResponseError)
    }

    create(createModel: UserCreateInput): Observable<UserBase> {
        return of({
            id: '2215906b-834a-4fce-8c59-b967bee20006',
            username: createModel.username,
            firstname: createModel.firstname,
            lastname: createModel.lastname,
            password: createModel.password,
            email: createModel.email,
            role: this.roleList.find(o => createModel.roleId === o.id)
        });
    }

    deleteById(id: string): Observable<any> {
        const item = this.resultList.find(o => o.id === id);
        if (!item) {
            return of({ name: `User with id=${id} not found.`} as ResponseError)
        }
        return of();
    }

    update(id: string, newModel: UserUpdateInput): Observable<UserBase | ResponseError> {
        const item = this.resultList.find(o => o.id === id);
        if (!item) {
            return of({ name: `User with id=${id} not found.`} as ResponseError)
        }
        item.username = newModel.username;
        item.password = newModel.password;
        item.firstname = newModel.firstname;
        item.lastname = newModel.lastname;
        item.email = newModel.email;
        if (newModel.roleId) {
            const role = this.roleList.find(o => o.id === newModel.roleId);
            item.role = role;
        }
        return of(item);
    }
    checkRoleName(userName: string): Observable<boolean> {
        const item = this.resultList.find(o => o.username === userName);
        if (!item) {
            return of(true)
        }
        return of(false);
    }
}
