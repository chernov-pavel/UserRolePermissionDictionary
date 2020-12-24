import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleBase} from '../../shared/components/role/role-base.model';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {RoleDialogData} from '../../shared/components/role/role-dialog-data.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
    dialogData: RoleBase = { id: '', name: '', permissions: [] };
    title: string;

    selectedPermissions = new FormControl();
    permissionList: PermissionBase[] = [];

    get canApply(): boolean {
        return this.dialogData.name.length > 0;
    }
    constructor(private roleApiService: RoleApiService,
                private permissionApiService: PermissionApiService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<RoleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: RoleDialogData) {
        if (data.model) {
            this.roleApiService.getById(data.model.id)
                .subscribe((o) => {
                    this.dialogData = o;
                    this.selectedPermissions.patchValue([...o.permissions.map(item => item.id), 0]);
                })
        }

        this.title = data.title;
        this.permissionApiService.getAll()
            .subscribe((o: PermissionBase[]) => {
                this.permissionList = o;
        })
        this.selectedPermissions
            .valueChanges
            .subscribe(o => {
                this.dialogData.permissions = o;
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onApply(): void {
        this.roleApiService.checkRoleName(this.dialogData.name)
            .subscribe((isUnique: boolean) => {
                if (isUnique) {
                    this.dialogRef.close(this.dialogData);
                }
            }, (err) => console.log(err));
    }

    ngOnInit(): void {
    }

}
