import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RoleBase} from '../../shared/components/role/role-base.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {MatDialog} from '@angular/material/dialog';
import {PageResponse} from '../../shared/models/page-response.model';
import {RoleDialogComponent} from '../../dialogs/role-dialog/role-dialog.component';
import {YesNoDialogComponent} from '../../dialogs/yes-no-dialog/yes-no-dialog.component';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {UserApiService} from '../../core/services/user/user.api.service';
import {UserBase} from '../../shared/components/user/user-base.model';
import {UserDialogComponent} from '../../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {
    displayedColumns: string[] = ['Id', 'Username', 'Password', 'Firstname', 'Lastname', 'Email', 'Role', 'Actions'];
    data: UserBase[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

    get needShowPagination(): boolean {
        return this.data.length > 10;
    }

    constructor(private userApiService: UserApiService, public dialog: MatDialog) {
    }

    ngAfterViewInit() {
        this.isLoadingResults = true;
        this.userApiService.get(
            {
                page: this.paginator === undefined
                    ? 0
                    : this.paginator.pageIndex,
                size: 30
            }).subscribe((data: PageResponse<UserBase>) => {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.totalElements;

            this.data = data.content;
        }, () => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            this.data = [];
        });
    }

    create() {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: '350px',
            data: {
                title: 'Create new role'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                return false;
            }
            this.userApiService.create({ username: result.username, firstname: result.firstname, lastname: result.lastname, password: result.password, email: result.email, roleId: result.role !== null ? result.role.id : '' })
                .subscribe(o => {
                    this.data.push(o);
                    this.table.renderRows();
                });
        });
    }

    delete(id: string) {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            maxWidth: "400px",
            data: { title: 'Delete permission', message: 'Do you want to delete this permission?' }
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.userApiService.deleteById(id)
                    .subscribe(() => {
                        const index = this.data.findIndex((o) => o.id === id)
                        this.data.splice(index, 1);
                        this.table.renderRows();
                    })
            }
        });
    }

    edit(user: UserBase) {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: '350px',
            data: {
                model: user,
                title: 'Update permission'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                return;
            }
            this.userApiService.update(result.id, { username: result.username, firstname: result.firstname, lastname: result.lastname, password: result.password, email: result.email, roleId: result.role !== null ? result.role.id : '' })
                .subscribe((item: UserBase) => {
                    const index = this.data.findIndex((o) => o.id === user.id)
                    this.data[index] = item;
                    this.table.renderRows();
                });
        });
    }

}
