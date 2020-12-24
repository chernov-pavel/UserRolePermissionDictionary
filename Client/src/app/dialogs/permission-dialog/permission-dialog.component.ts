import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PermissionDialogData} from '../../shared/components/permission/permission-dialog-data.model';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  styleUrls: ['./permission-dialog.component.scss']
})
export class PermissionDialogComponent implements OnInit {
    dialogData: PermissionBase = { id: '', name: ''};
    title: string;

    get canApply(): boolean {
        return this.dialogData.name.length > 0;
    }
    constructor(private permissionApiService: PermissionApiService,
                public dialogRef: MatDialogRef<PermissionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PermissionDialogData) {
        this.title = data.title;
        if (data.model) {
            this.permissionApiService.getById(data.model.id)
                .subscribe((o) => {
                    this.dialogData = o;
            })
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onApply(): void {
        this.permissionApiService.checkPermissionName(this.dialogData.name)
            .subscribe((isUnique: boolean) => {
                if (isUnique) {
                    this.dialogRef.close(this.dialogData);
                }
            }, (err) => console.log(err));
    }

    ngOnInit(): void {
    }

}
