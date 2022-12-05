import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA  } from '@angular/material/dialog';

interface DialogData {
  title: string;
  errorMessage: string;
  isValidationError: boolean;
  isAuthFailedInfoError: boolean;
}
@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
