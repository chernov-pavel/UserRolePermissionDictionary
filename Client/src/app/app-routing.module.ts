import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './modules/user/user.component';
import {RoleComponent} from './modules/role/role.component';
import {PermissionComponent} from './modules/permission/permission.component';


const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component:  UserComponent},
  { path: 'roles', component:  RoleComponent},
  { path: 'permissions', component: PermissionComponent}
];
export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
