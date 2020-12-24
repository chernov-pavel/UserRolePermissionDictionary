import {Component, Inject, OnInit} from '@angular/core';
import {RoleBase} from '../../shared/components/role/role-base.model';
import {FormBuilder, FormControl} from '@angular/forms';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleDialogData} from '../../shared/components/role/role-dialog-data.model';
import {UserBase} from '../../shared/components/user/user-base.model';
import {UserApiService} from '../../core/services/user/user.api.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
    dialogData: UserBase = { id: '', username: '', password: '', firstname: '', lastname: '', email: '', role: null };
    title: string;

    roleList: RoleBase[] = [];

    get canApply(): boolean {
        return this.dialogData.username.length > 0
            && this.dialogData.password.length > 0
            && this.dialogData.firstname.length > 0
            && this.dialogData.lastname.length > 0
            && this.dialogData.email.length > 0;
    }
    constructor(private roleApiService: RoleApiService,
                private userApiService: UserApiService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: RoleDialogData) {
        if (data.model) {
            this.userApiService.getById(data.model.id)
                .subscribe((o) => {
                    this.dialogData = o;
                })
        }

        this.title = data.title;
        this.roleApiService.getAll()
            .subscribe((o: RoleBase[]) => {
                this.roleList = o;
            })
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onApply(): void {
        this.userApiService.checkUsername(this.dialogData.username)
            .subscribe((isUnique: boolean) => {
                if (isUnique) {
                    this.dialogRef.close(this.dialogData);
                }
            }, (err) => console.log(err));
    }

    ngOnInit(): void {
    }
}
