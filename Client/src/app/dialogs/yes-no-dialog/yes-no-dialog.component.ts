import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogModel} from '../../shared/models/confirm-dialog.model';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {
    title: string;
    message: string;

    constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit() {
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}
