import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {PageResponse} from '../../shared/models/page-response.model';
import {YesNoDialogComponent} from '../../dialogs/yes-no-dialog/yes-no-dialog.component';
import {RoleBase} from '../../shared/components/role/role-base.model';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {RoleDialogComponent} from '../../dialogs/role-dialog/role-dialog.component';
import {RoleCreateInput} from '../../shared/components/role/role-create-input.model';
import {RoleUpdateInput} from '../../shared/components/role/role-update-input.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements AfterViewInit {
    displayedColumns: string[] = ['Id', 'Role', 'Permissions', 'Actions'];
    data: RoleBase[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

    get needShowPagination(): boolean {
        return this.data.length > 10;
    }

    constructor(private roleApiService: RoleApiService, public dialog: MatDialog) {
    }

    ngAfterViewInit() {
        this.isLoadingResults = true;
        this.roleApiService.get(
            {
                page: this.paginator === undefined
                    ? 0
                    : this.paginator.pageIndex,
                size: 30
            }).subscribe((data: PageResponse<RoleBase>) => {
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
        const dialogRef = this.dialog.open(RoleDialogComponent, {
            width: '350px',
            data: {
                title: 'Create new role'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                return false;
            }
            this.roleApiService.create({ name: result.name, permissionIds: result.permissions })
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
                this.roleApiService.deleteById(id)
                    .subscribe(() => {
                        const index = this.data.findIndex((o) => o.id === id)
                        this.data.splice(index, 1);
                        this.table.renderRows();
                    })
            }
        });
    }

    edit(permission: PermissionBase) {
        const dialogRef = this.dialog.open(RoleDialogComponent, {
            width: '350px',
            data: {
                model: permission,
                title: 'Update permission'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                return;
            }
            this.roleApiService.update(result.id, { name: result.name, permissionIds: result.permissions })
                .subscribe((item: RoleBase) => {
                    const index = this.data.findIndex((o) => o.id === permission.id)
                    this.data[index] = item;
                    this.table.renderRows();
                });
        });
    }
}
