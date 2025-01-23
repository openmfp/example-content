import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  FormModule,
  FundamentalNgxCoreModule,
  IllustratedMessageModule,
} from '@fundamental-ngx/core';
import { HttpBinService } from '../services/httpbin-service.service';
import { MutationResult } from 'apollo-angular';
import { CreateHttpBinResponse } from '../models/httpbins';
import { linkManager, uxManager } from '@luigi-project/client';
import { tap } from 'rxjs';
import { ApolloError } from '@apollo/client';

@Component({
  selector: 'app-create-httpbin-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FundamentalNgxCoreModule,
    CommonModule,
    IllustratedMessageModule,
    FormModule,
    ButtonComponent,
  ],
  templateUrl: './create-httpbin-modal.component.html',
  styleUrl: './create-httpbin-modal.component.scss',
})
export class CreateHttpBinModalComponent {
  constructor(private httpbinService: HttpBinService) {}

  createHttpbinForm = new FormGroup({
    key: new FormControl('', [
      Validators.required,
      Validators.maxLength(253),
      this.keyValidator(),
    ]),
    foo: new FormControl(''),
  });

  onSubmit(): void {
    if (this.createHttpbinForm.valid) {
      this.httpbinService
        .createBin({
          key: this.createHttpbinForm.controls.key.value as string,
          foo: this.createHttpbinForm.controls.foo.value,
        })
        .pipe(
          tap(async (apolloResponse: MutationResult<CreateHttpBinResponse>) => {
            if (!apolloResponse.errors) {
              linkManager().navigate(
                `${await linkManager().getCurrentRoute()}`
              );
            }
          })
        )
        .subscribe({
          error: (err: any) => {
            if (
              Object(err).hasOwnProperty('name') &&
              err.name == 'ApolloError'
            ) {
              uxManager().showAlert({
                type: 'error',
                text: (err as ApolloError).message,
                closeAfter: 5000,
              });
            } else {
              uxManager().showAlert({
                type: 'error',
                text: 'An unexpected error occured. Please try again later.',
                closeAfter: 5000,
              });
            }
          },
        });
    }
  }

  onClose(): void {
    uxManager().closeCurrentModal();
  }

  private keyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern: RegExp = /^(?![0-9-])[A-Za-z0-9-]{1,63}(?<!-)$/g;
      return !pattern.test(control.value)
        ? { key: { value: control.value } }
        : null;
    };
  }
}
