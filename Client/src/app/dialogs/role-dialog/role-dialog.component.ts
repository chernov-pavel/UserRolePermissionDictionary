import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleBase} from '../../shared/components/role/role-base.model';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {RoleDialogData} from '../../shared/components/role/role-dialog-data.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
    dialogData: RoleBase = { id: '', name: '', permissions: [] };
    title: string;

    permissionList: PermissionBase[] = [];
    previousRoleName: string = '';
    previousPermission: PermissionBase[] = [];

    public roleDialogFormGroup: FormGroup;

    get canApply(): boolean {
        return this.dialogData.name.length > 0;
    }
    constructor(private roleApiService: RoleApiService,
                private permissionApiService: PermissionApiService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<RoleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: RoleDialogData,
                private snackBar: MatSnackBar) {
        this.roleDialogFormGroup = this.formBuilder.group({
            name: [, { validators: [Validators.required], updateOn: "change" }],
            selectedPermissions: [, { validators: [], updateOn: "change" }]
        });
        if (data.model) {
            this.roleApiService.getById(data.model.id)
                .subscribe((o) => {
                    this.dialogData = o;
                    this.roleDialogFormGroup
                        .controls['name']
                        .patchValue(o.name);
                    this.roleDialogFormGroup
                        .controls['selectedPermissions']
                        .patchValue([...o.permissions.map(item => item.id)]);
                    this.previousRoleName = o.name;
                    this.previousPermission = o.permissions
                })
        }

        this.title = data.title;
        this.permissionApiService.getAll()
            .subscribe((o: PermissionBase[]) => {
                this.permissionList = o;
        })
        this.roleDialogFormGroup
            .controls['selectedPermissions']
            .valueChanges
            .subscribe(o => {
                this.dialogData.permissions = o;
        });
        this.roleDialogFormGroup
            .controls['name']
            .valueChanges
            .subscribe(o => {
                this.dialogData.name = o;
            });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onApply(): void {
        if (this.previousRoleName !== this.dialogData.name) {
            this.roleApiService.checkRoleName(this.dialogData.name)
                .subscribe((isUnique: boolean) => {
                    if (isUnique) {
                        this.dialogRef.close(this.dialogData);
                    } else {
                        this.snackBar.open('Role name isn\'t unique.', 'Close', {
                            duration: 1500,
                        });
                    }
                }, (err) => console.log(err));
        } else if (this.previousPermission !== this.dialogData.permissions){
            this.dialogRef.close(this.dialogData);
        } else {
            this.dialogRef.close(this.dialogData);
        }
    }

    ngOnInit(): void {
    }
}
