import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  passwordForm: UntypedFormGroup;
  accessGuid: string = "";

  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.passwordForm = this.fb.group({
      password: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit() {
    this.accessGuid = this.activatedRoute.snapshot.params['accessGuid'];

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.accessGuid = params['accessGuid'];
      }
    )

  }

  resetPassword() {
    var passwordReset = {password: this.passwordForm.value.password, 
      confirmPassword: this.passwordForm.value.confirmPassword,
      passwordResetKey: this.accessGuid
    }

    debugger;
    this.authService.passwordReset(passwordReset);
  }

}
