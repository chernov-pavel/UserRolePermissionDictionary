import {BaseModel} from '../../models/base-model.model';
import {RoleBase} from '../role/role-base.model';

export interface UserBase extends BaseModel {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    role: RoleBase;
}
