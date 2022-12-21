import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  passwordForm: FormGroup;
  accessGuid: string = "";
  showPassword: boolean = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.passwordForm = this.fb.group({
      password: fb.control('', Validators.compose([Validators.required,
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      Validators.minLength(8),
      CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })])),
      confirmPassword: fb.control('', [Validators.required]),
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
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
    var passwordReset = {
      password: this.passwordForm.value.password,
      confirmPassword: this.passwordForm.value.confirmPassword,
      passwordResetKey: this.accessGuid
    }

    this.authService.passwordReset(passwordReset);
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}
