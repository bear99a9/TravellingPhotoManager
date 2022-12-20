import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRequestPasswordReset } from '../../shared/models/UserRequestPasswordReset.model';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  passwordReset: UntypedFormGroup;

  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.passwordReset = this.fb.group({
      email: ['']
    })
  }

  ngOnInit() {}


  resetPassword(){
    this.authService.requestPasswordReset(this.passwordReset.value)
  }

}
