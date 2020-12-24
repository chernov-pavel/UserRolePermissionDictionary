import {BaseModel} from '../../models/base-model.model';
import {PermissionBase} from '../permission/permission.base.model';

export interface RoleBase extends BaseModel {
    name: string;
    permissions: PermissionBase[];
}
