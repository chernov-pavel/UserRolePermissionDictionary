import {Component, Inject, OnInit} from '@angular/core';
import {RoleBase} from '../../shared/components/role/role-base.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PermissionBase} from '../../shared/components/permission/permission.base.model';
import {RoleApiService} from '../../core/services/role/role.api.service';
import {PermissionApiService} from '../../core/services/permission/permission.api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleDialogData} from '../../shared/components/role/role-dialog-data.model';
import {UserBase} from '../../shared/components/user/user-base.model';
import {UserApiService} from '../../core/services/user/user.api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
    dialogData: UserBase = { id: '', username: '', password: '', firstname: '', lastname: '', email: '', role: null };
    title: string;

    roleList: RoleBase[] = [];

    userDialogFormGroup: FormGroup;

    previousUsername: string = '';
    previousPassword: string = '';
    previousFirstname: string = '';
    previousLastname: string = '';
    previousEmail: string = '';
    previousRoleId: string = '';

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
                @Inject(MAT_DIALOG_DATA) public data: RoleDialogData,
                private snackBar: MatSnackBar) {
        this.userDialogFormGroup = this.formBuilder.group({
            username: [, { validators: [Validators.required], updateOn: "change" }],
            password: [, { validators: [Validators.required], updateOn: "change" }],
            firstname: [, { validators: [Validators.required], updateOn: "change" }],
            lastname: [, { validators: [Validators.required], updateOn: "change" }],
            email: [, { validators: [Validators.required, Validators.email], updateOn: "change" }],
            selectedRole: [, { validators: [], updateOn: "change" }]
        });
        if (data.model) {
            this.userApiService.getById(data.model.id)
                .subscribe((o) => {
                    this.dialogData = o;
                    this.previousUsername = o.username;
                    this.previousPassword = o.password;
                    this.previousFirstname = o.firstname;
                    this.previousLastname = o.lastname;
                    this.previousEmail = o.email;
                    if (o.role) {
                        this.previousRoleId = o.role.id;
                    }

                    this.userDialogFormGroup.controls['username'].patchValue(o.username);
                    this.userDialogFormGroup.controls['password'].patchValue(o.password);
                    this.userDialogFormGroup.controls['firstname'].patchValue(o.firstname);
                    this.userDialogFormGroup.controls['lastname'].patchValue(o.lastname);
                    this.userDialogFormGroup.controls['email'].patchValue(o.email);
                    if (o.role) {
                        this.userDialogFormGroup.controls['selectedRole'].patchValue(o.role.id);
                    }
                })
        }

        this.title = data.title;
        this.roleApiService.getAll()
            .subscribe((o: RoleBase[]) => {
                this.roleList = o;
            })

        this.userDialogFormGroup
            .controls['username']
            .valueChanges
            .subscribe(o => {
            this.dialogData.username = o;
        });
        this.userDialogFormGroup
            .controls['password']
            .valueChanges
            .subscribe(o => {
                this.dialogData.password = o;
            });
        this.userDialogFormGroup
            .controls['firstname']
            .valueChanges
            .subscribe(o => {
                this.dialogData.firstname = o;
            });
        this.userDialogFormGroup
            .controls['lastname']
            .valueChanges
            .subscribe(o => {
                this.dialogData.lastname = o;
            });
        this.userDialogFormGroup
            .controls['email']
            .valueChanges
            .subscribe(o => {
                this.dialogData.email = o;
            });
        this.userDialogFormGroup
            .controls['selectedRole']
            .valueChanges
            .subscribe(o => {
                this.dialogData.role = this.roleList.find(t => t.id === o);
            });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onApply(): void {
        if (this.previousUsername !== this.dialogData.username) {
            this.userApiService.checkUsername(this.dialogData.username)
                .subscribe((isUnique: boolean) => {
                    if (isUnique) {
                        this.dialogRef.close(this.dialogData);
                    } else {
                        this.snackBar.open('User name isn\'t unique.', 'Close', {
                            duration: 1500,
                        });
                    }
                }, (err) => console.log(err));
        } else if (this.hasChanges()) {
            this.dialogRef.close(this.dialogData);
        } else {
            this.dialogRef.close(false);
        }

    }

    ngOnInit(): void {
    }

    hasChanges(): boolean {
        return this.previousUsername !== this.dialogData.username
            || this.previousLastname !== this.dialogData.lastname
            || this.previousFirstname !== this.dialogData.firstname
            || this.previousPassword !== this.dialogData.password
            || this.previousEmail !== this.dialogData.email
            || (this.dialogData.role
                && this.previousRoleId !== this.dialogData.role.id)
    }
}
