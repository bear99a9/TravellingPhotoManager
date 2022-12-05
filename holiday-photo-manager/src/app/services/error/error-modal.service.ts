import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorModalComponent } from 'src/app/shared/error/error-modal/error-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ErrorModalService {

    private _errorModalShowing: boolean = false;

    public isValidationError: boolean = false;
    public isAuthFailedInfoError: boolean = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,
    ) { }

    public show(message: string, error: any, title: string = ""): void {
        if (!this._errorModalShowing) {
            this._errorModalShowing = true;
            this.isValidationError = error.isValidationError == null ? false : error.isValidationError;
            this.isAuthFailedInfoError = error.status == null ? false : error.status === 401;

            const dialogRef = this.dialog.open(ErrorModalComponent, {
                data: {
                    title: title,
                    errorMessage: message,
                    isValidationError: this.isValidationError,
                    isAuthFailedInfoError: this.isAuthFailedInfoError
                },
                panelClass: this.isValidationError ? 'my-validation-error-dialog' : this.isAuthFailedInfoError ? 'my-info-error-dialog' : 'my-error-dialog',
                disableClose: true
            });
            dialogRef.afterClosed().subscribe({
                next: async () => {
                    this._errorModalShowing = false;
                    if (error.status === 401) {
                        this.router.navigate(['/log-in']);
                    }
                },
                error: () => {
                },
                complete() {
                },
            });
        }
    }
}
