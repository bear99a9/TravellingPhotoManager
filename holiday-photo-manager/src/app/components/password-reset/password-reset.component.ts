import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  matchValidator(
    control: AbstractControl,
    controlTwo: AbstractControl
  ): ValidatorFn {
    return () => {
      if (control.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
}
