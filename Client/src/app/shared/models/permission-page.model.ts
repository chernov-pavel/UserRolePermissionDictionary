import {PermissionBaseModel} from '../components/permission/permission-base.model';

export interface PageResponse<T> {
    content: T[];
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}
