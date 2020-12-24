import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {PageResponse} from '../../shared/models/page-response.model';
import {MatDialog} from '@angular/material/dialog';
import {PermissionDialogComponent} from '../../dialogs/permission-dialog/permission-dialog.component';
import {MatTable} from '@angular/material/table';
import {YesNoDialogComponent} from '../../dialogs/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements AfterViewInit {
    displayedColumns: string[] = ['Id', 'Permission', 'Actions'];
    data: PermissionBase[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

    get needShowPagination(): boolean {
        return this.data.length > 10;
    }

    constructor(private permissionApiService: PermissionApiService, public dialog: MatDialog) {
    }

    ngAfterViewInit() {
        this.isLoadingResults = true;
        this.permissionApiService.get(
            {
                            page: this.paginator === undefined
                                ? 0
                                : this.paginator.pageIndex,
                            size: 30
            }).subscribe((data: PageResponse<PermissionBase>) => {
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

    addPermission() {
        const dialogRef = this.dialog.open(PermissionDialogComponent, {
            width: '350px',
            data: {
                title: 'Create new permission'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                return false;
            }
            this.permissionApiService.create({ name: result.name })
                .subscribe(o => {
                    this.data.push(o);
                    this.table.renderRows();
            });
        });
    }

    deletePermission(id: string) {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            maxWidth: "400px",
            data: { title: 'Delete permission', message: 'Do you want to delete this permission?' }
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.permissionApiService.deleteById(id)
                    .subscribe(() => {
                        const index = this.data.findIndex((o) => o.id === id)
                        this.data.splice(index, 1);
                        this.table.renderRows();
                    })
            }
        });
    }

    editPermission(permission: PermissionBase) {
        const dialogRef = this.dialog.open(PermissionDialogComponent, {
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
            this.permissionApiService.update(result.id, { name: result.name })
                .subscribe((item: PermissionBase) => {
                    const index = this.data.findIndex((o) => o.id === permission.id)
                    this.data[index] = item;
                    this.table.renderRows();
                });
        });
    }
}
