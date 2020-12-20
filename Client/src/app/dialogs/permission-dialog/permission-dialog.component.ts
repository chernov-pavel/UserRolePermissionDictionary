import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PermissionDialogData} from '../../shared/components/permission/permission-dialog-data';
import {PermissionBaseModel} from '../../shared/components/permission/permission-base.model';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';

@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  styleUrls: ['./permission-dialog.component.scss']
})
export class PermissionDialogComponent implements OnInit {
    get canApply(): boolean {
        return this.data.model.name.length > 0;
    }
    constructor(private permissionApiService: PermissionApiService,
                public dialogRef: MatDialogRef<PermissionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PermissionDialogData) {

    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onApply(): void {
        this.permissionApiService.add(this.data.model.name)
            .subscribe((item: PermissionBaseModel) => {
                this.dialogRef.close(item);
            }, (err) => console.log(err));
    }

    ngOnInit(): void {
    }

}
