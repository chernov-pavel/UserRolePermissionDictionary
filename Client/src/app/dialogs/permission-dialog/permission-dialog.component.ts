import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PermissionDialogData} from '../../shared/components/permission/permission-dialog-data.model';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  styleUrls: ['./permission-dialog.component.scss']
})
export class PermissionDialogComponent implements OnInit {
    dialogData: PermissionBase = { id: '', name: ''};
    title: string;
    previousPermissionName: string;

    public permissionDialogFormGroup: FormGroup;

    get canApply(): boolean {
        return this.dialogData.name.length > 0;
    }
    constructor(private permissionApiService: PermissionApiService,
                public dialogRef: MatDialogRef<PermissionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PermissionDialogData,
                private formBuilder: FormBuilder,
                private snackBar: MatSnackBar) {
        this.permissionDialogFormGroup = this.formBuilder.group({
                name: [, { validators: [Validators.required], updateOn: "change" }]
            });

        this.title = data.title;
        if (data.model) {
            this.permissionApiService.getById(data.model.id)
                .subscribe((o) => {
                    this.dialogData = o;
                    this.previousPermissionName = o.name;
            })
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onApply(): void {
        if (this.previousPermissionName !== this.dialogData.name) {
            this.permissionApiService.checkPermissionName(this.dialogData.name)
                .subscribe((isUnique: boolean) => {
                    if (isUnique) {
                        this.dialogRef.close(this.dialogData);
                    } else {
                        this.snackBar.open('Permission isn\'t unique.', 'Close', {
                            duration: 1500,
                        });
                    }
                }, (err) => console.log(err));
        } else {
            this.dialogRef.close(false);
        }
    }

    ngOnInit(): void {
    }
}
